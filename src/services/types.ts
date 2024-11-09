export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SigninFields {
  email: string;
  password: string;
}

export interface VideoResponse {
	data: Blob;
}

export interface SignupResponse {
  message: string;
}

export interface SignupFields {
  email: string;
  name: string;
  password: string;
}

export interface SigninResponse {
  message: string;
}

export interface GoogleSignupResponse {
  message: string;
}

export interface GoogleSigninResponse {
  message: string;
}

// PROMPT SERVICE

export interface MusicGenerationResponse {
  success: boolean;
  message: string;
  data: MusicGenerationData;
}

export interface SnapshotPrompt {
  originalImage: string;
  generatedDescription: string;
  _id: string;
  timestamp: string;
}

export interface GeneratedMusic {
  generatedAt: string;
  url: string;
}

export interface MusicGenerationBody {
	video: string;
  snapshots: string[];
  duration: string;
  type: string;
  style: string;
}

export interface MusicGenerationData {
  generatedMusic: GeneratedMusic;
	video: string;
  _id: string;
  user: string;
  style: string;
  type: string;
  duration: number;
  status: string;
  snapshotPrompts: SnapshotPrompt[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  combinedContext: string;
  musicBrief: string;
  processingTime: number;
}

export interface MusicGeneratedResponse {
  success: boolean;
  message: string;
  data: MusicGenerationData;
}

export interface UserPrompts {
	prompts: MusicGenerationData[];
	total: number;
	page: number;
	pages: number;
}

export interface UserPromptsResponse {
	success: boolean;
	message: string;
	data: UserPrompts;
}
// PROMPT SERVICE END

export interface PaymentFields {
	name: string;
	address: string;
	city: string;
	zipCode: string;
	country: string;
	token: string;
	planId: number;
	email: string;
}