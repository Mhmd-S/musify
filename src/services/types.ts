export interface User {
  id: string;
  email: string;
  name: string;
}

export interface MusicGenerationBody {
	snapshots: string[];
	duration: string;
	type: string;
	style: string;
}

export interface MusicGenerationResponse {
	data: string;
	// Add other response fields as needed
}

export interface SigninFields {
	email: string;
	password: string;
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
