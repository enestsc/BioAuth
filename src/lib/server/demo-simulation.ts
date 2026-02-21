export type Scenario = "genuine" | "replay" | "deepfake_like" | "poor_lighting" | "high_motion";
export type ChallengeType = "head_turn" | "blink" | "mixed";

export interface AnalysisResult {
  challenge_score: number;
  pulse_signal: number[];
  spectrum_data: number[];
  bpm_estimate: number;
  signal_quality: number;
  liveness_confidence: number;
  decision: "accept" | "retry" | "reject";
  reason_codes: string[];
  explanation: string;
  recommendation: "proceed" | "retry_better_lighting" | "retry_hold_still" | "manual_review";
}

function generateNoisyWaveform(baseFreq: number, length: number, noiseLevel: number, amplitude: number = 1) {
  return Array.from({ length }).map((_, i) => {
    const t = i / 30; // Assuming 30fps
    const signal = Math.sin(2 * Math.PI * baseFreq * t) * amplitude;
    const noise = (Math.random() - 0.5) * noiseLevel;
    return signal + noise;
  });
}

function generateSpectrum(peakFreq: number, noiseLevel: number) {
  // Generate a mock frequency spectrum (0 to 3 Hz, approx 0 to 180 BPM)
  return Array.from({ length: 60 }).map((_, i) => {
    const freq = i * 0.05; // 0 to 3 Hz
    const dist = Math.abs(freq - peakFreq);
    const peak = Math.max(0, 1 - dist * 4) * 10;
    const noise = Math.random() * noiseLevel;
    return peak + noise;
  });
}

export async function simulateAnalysis(scenario: Scenario, challengeType: ChallengeType): Promise<AnalysisResult> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

  const baseBpm = 60 + Math.random() * 30; // 60-90 BPM
  const baseFreq = baseBpm / 60; // Hz
  
  let result: AnalysisResult = {
    challenge_score: 0,
    pulse_signal: [],
    spectrum_data: [],
    bpm_estimate: 0,
    signal_quality: 0,
    liveness_confidence: 0,
    decision: "reject",
    reason_codes: [],
    explanation: "",
    recommendation: "manual_review",
  };

  switch (scenario) {
    case "genuine":
      result.challenge_score = 0.85 + Math.random() * 0.15;
      result.signal_quality = 0.8 + Math.random() * 0.2;
      result.bpm_estimate = Math.round(baseBpm);
      result.liveness_confidence = 0.9 + Math.random() * 0.1;
      result.pulse_signal = generateNoisyWaveform(baseFreq, 100, 0.2, 1);
      result.spectrum_data = generateSpectrum(baseFreq, 1);
      result.decision = "accept";
      result.reason_codes = ["CHALLENGE_PASSED", "PULSE_CONFIDENCE_HIGH"];
      result.explanation = "Strong physiological rPPG signal detected alongside successful challenge response.";
      result.recommendation = "proceed";
      break;

    case "replay":
      result.challenge_score = 0.7 + Math.random() * 0.2; // Visual challenge passes easily
      result.signal_quality = 0.2 + Math.random() * 0.2;
      result.bpm_estimate = Math.round(40 + Math.random() * 80); // Erratic
      result.liveness_confidence = 0.1 + Math.random() * 0.2;
      result.pulse_signal = generateNoisyWaveform(baseFreq, 100, 2.0, 0.2); // Mostly noise
      result.spectrum_data = generateSpectrum(1.5, 5); // Noisy spectrum
      result.decision = "reject";
      result.reason_codes = ["NO_STABLE_PULSE_SIGNATURE", "SYNTHETIC_MEDIA_SUSPECTED"];
      result.explanation = "While visual challenge was acceptable, physiological liveness could not be established. Lack of consistent pulse indicates possible replay attack.";
      result.recommendation = "manual_review";
      break;

    case "deepfake_like":
      result.challenge_score = 0.6 + Math.random() * 0.3;
      result.signal_quality = 0.3 + Math.random() * 0.2;
      result.bpm_estimate = Math.round(baseBpm);
      result.liveness_confidence = 0.2 + Math.random() * 0.2;
      result.pulse_signal = generateNoisyWaveform(baseFreq, 100, 1.5, 0.4); 
      result.spectrum_data = generateSpectrum(baseFreq, 3); 
      result.decision = "reject";
      result.reason_codes = ["SIGNAL_INCONSISTENCY", "SPATIAL_ARTIFACTS_DETECTED"];
      result.explanation = "Physiological signals are inconsistent across facial regions, a common indicator of synthetic generation or deepfakes.";
      result.recommendation = "manual_review";
      break;

    case "poor_lighting":
      result.challenge_score = 0.5 + Math.random() * 0.3;
      result.signal_quality = 0.1 + Math.random() * 0.15;
      result.bpm_estimate = 0;
      result.liveness_confidence = 0.1;
      result.pulse_signal = generateNoisyWaveform(0, 100, 0.5, 0.1); // flat noise
      result.spectrum_data = generateSpectrum(0, 1);
      result.decision = "retry";
      result.reason_codes = ["LIGHTING_INSUFFICIENT", "LOW_SIGNAL_QUALITY"];
      result.explanation = "Insufficient lighting to extract physiological signals reliably. Please move to a brighter environment.";
      result.recommendation = "retry_better_lighting";
      break;

    case "high_motion":
      result.challenge_score = 0.4 + Math.random() * 0.4;
      result.signal_quality = 0.2 + Math.random() * 0.2;
      result.bpm_estimate = Math.round(90 + Math.random() * 40); // very high due to motion
      result.liveness_confidence = 0.3 + Math.random() * 0.2;
      result.pulse_signal = generateNoisyWaveform(2, 100, 3.0, 2.0); // massive noise/peaks
      result.spectrum_data = generateSpectrum(2, 4);
      result.decision = "retry";
      result.reason_codes = ["MOTION_ARTIFACT_HIGH", "LOW_SIGNAL_QUALITY"];
      result.explanation = "Subject motion is too high, obscuring physiological signals. Please hold device steady.";
      result.recommendation = "retry_hold_still";
      break;
  }

  return result;
}
