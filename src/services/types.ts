export interface MusicGenerationParams {
  snapshots: string[];
  duration: string;
  type: string;
  style: string;
}

export interface MusicGenerationResponse {
  data: string;
  // Add other response fields as needed
}
