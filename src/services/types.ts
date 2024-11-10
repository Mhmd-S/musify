import { Url } from "url";

export interface User {
	_id: string;        // MongoDB ObjectId as string
	email: string;
	name: string;
	isActive: boolean;
	role: 'user' | 'admin' | string;  // You might want to add other possible role values
	credits: number;
	googleId: string;
	isEmailVerified: boolean;
	lastLogin: string;  // ISO 8601 date string
	createdAt: string;  // ISO 8601 date string
	updatedAt: string;  // ISO 8601 date string
	__v: number;        // MongoDB version key
}

export interface Plan {
  id: number;
  name: string;
  price: Float32Array
  credits: number;
}

export interface Receipt {
	userId: string;
	receiptNumber?: string;
	amount?: number;
	currency: string;
	status: string;
	paymentMethod: string;
	orderId?: string;
	receiptUrl?: Url;
	billingAddress: string;
	country: string;
	zipcode: string;
	city: string;
	name: string;
	plan: Plan; // Adjust as needed for the specific structure of `plan`
	createdAt?: Date;
	updatedAt?: Date;
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