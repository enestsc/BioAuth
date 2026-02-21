import { type Scenario, type ChallengeType, type AnalysisResult } from "./server/demo-simulation";

export interface DemoSessionInit {
  session_id: string;
  created_at: string;
  demo_mode: boolean;
  available_scenarios: string[];
  available_challenges: string[];
}

export interface ContactPayload {
  fullName: string;
  email: string;
  organization?: string;
  role: string;
  useCase: string;
  message: string;
  consent: boolean;
}

const API_BASE = '/api';

export const api = {
  health: async () => {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error("Health check failed");
    return res.json();
  },
  
  startSession: async (): Promise<DemoSessionInit> => {
    const res = await fetch(`${API_BASE}/demo/session`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to start session");
    return res.json();
  },
  
  analyze: async (payload: { session_id: string; scenario: Scenario; challenge_type: ChallengeType }): Promise<AnalysisResult> => {
    const res = await fetch(`${API_BASE}/demo/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Analysis request failed");
    return res.json();
  },

  submitContact: async (payload: ContactPayload) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to submit contact form");
    }
    return res.json();
  }
};
