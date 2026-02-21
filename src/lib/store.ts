import { create } from 'zustand';
import { type Scenario, type ChallengeType, type AnalysisResult } from './server/demo-simulation';
import { api, type DemoSessionInit } from './api';

export type DemoState = 'idle' | 'initializing' | 'ready' | 'analyzing' | 'complete' | 'error';

export interface DemoEvent {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface BioAuthStore {
  // Config state
  scenario: Scenario;
  challengeType: ChallengeType;
  setScenario: (scenario: Scenario) => void;
  setChallengeType: (type: ChallengeType) => void;

  // Session state
  sessionId: string | null;
  state: DemoState;
  events: DemoEvent[];
  latestResult: AnalysisResult | null;
  errorMessage: string | null;

  // Camera/Environment state
  cameraConnected: boolean;
  faceDetected: boolean;
  lightingGood: boolean;
  setCameraConnected: (connected: boolean) => void;
  setFaceDetected: (detected: boolean) => void;
  setLightingGood: (good: boolean) => void;

  // Actions
  addEvent: (message: string, type?: DemoEvent['type']) => void;
  initSession: () => Promise<void>;
  startAnalysis: () => Promise<void>;
  resetDemo: () => void;
}

export const useBioAuthStore = create<BioAuthStore>((set, get) => ({
  scenario: 'genuine',
  challengeType: 'mixed',
  setScenario: (scenario) => set({ scenario }),
  setChallengeType: (challengeType) => set({ challengeType }),

  sessionId: null,
  state: 'idle',
  events: [],
  latestResult: null,
  errorMessage: null,

  cameraConnected: false,
  faceDetected: false,
  lightingGood: true,
  setCameraConnected: (cameraConnected) => set({ cameraConnected }),
  setFaceDetected: (faceDetected) => set({ faceDetected }),
  setLightingGood: (lightingGood) => set({ lightingGood }),

  addEvent: (message, type = 'info') => set((state) => ({
    events: [...state.events, { id: crypto.randomUUID(), timestamp: new Date().toISOString(), message, type }]
  })),

  initSession: async () => {
    try {
      set({ state: 'initializing', errorMessage: null });
      get().addEvent('Initializing secure session...', 'info');
      
      const session = await api.startSession();
      
      set({ 
        sessionId: session.session_id, 
        state: 'ready',
      });
      get().addEvent('Session initialized and ready', 'success');
    } catch (err: any) {
      set({ state: 'error', errorMessage: err.message || 'Failed to initialize session' });
      get().addEvent('Session initialization failed', 'error');
    }
  },

  startAnalysis: async () => {
    const { sessionId, scenario, challengeType, addEvent } = get();
    if (!sessionId) return;
    
    try {
      set({ state: 'analyzing', errorMessage: null, latestResult: null });
      addEvent('Evaluating active challenge response...', 'info');
      addEvent('Extracting physiological signals (rPPG)...', 'info');
      
      const result = await api.analyze({
        session_id: sessionId,
        scenario,
        challenge_type: challengeType
      });
      
      set({ state: 'complete', latestResult: result });
      
      if (result.decision === 'accept') {
        addEvent(`Analysis complete: Liveness Confirmed`, 'success');
      } else if (result.decision === 'retry') {
        addEvent(`Analysis complete: Unclear signals, Retry suggested`, 'warning');
      } else {
        addEvent(`Analysis complete: Liveness Rejected`, 'error');
      }
    } catch (err: any) {
      set({ state: 'error', errorMessage: err.message || 'Analysis failed' });
      addEvent('Analysis failed due to a system error', 'error');
    }
  },

  resetDemo: () => {
    set({
      state: 'ready', // Go back to ready if session is still valid, else idle
      latestResult: null,
      errorMessage: null,
      events: []
    });
    get().addEvent('Demo reset to initial state', 'info');
  }
}));
