import { Url } from 'url';

// Base response structure for all API calls
export interface ApiResponse<T> {
	status: boolean; // Indicates success or failure
	message: string; // Response message
	data: T; // Generic type for response payload
}

// === USER SERVICE ===

export interface User {
	_id: string; // MongoDB ObjectId as string
	email: string;
	name: string;
	isActive: boolean;
	role: 'user' | 'admin' | string; // Extendable role options
	credits: number;
	googleId: string;
	isEmailVerified: boolean;
	lastLogin: string; // ISO 8601 date string
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	__v: number; // MongoDB version key
}

// Authentication
export interface SigninFields {
	email: string;
	password: string;
}

export interface SignupFields {
	email: string;
	name: string;
	password: string;
}

// === PLAN & PAYMENT SERVICE ===

export interface Plan {
	id: number;
	name: string;
	price: number; // Float32Array replaced for simplicity
	credits: number;
}

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

export interface Receipt {
	userId: string;
	receiptNumber?: string;
	amount?: number;
	currency: string;
	status: string;
	paymentMethod: string;
	orderId?: string;
	receiptUrl?: string; // Adjusted to string for simplicity
	billingAddress: string;
	country: string;
	zipcode: string;
	city: string;
	name: string;
	plan: Plan; // Associated plan details
	createdAt?: string; // Changed to ISO 8601 string
	updatedAt?: string; // Changed to ISO 8601 string
}

// === PROMPT SERVICE ===

export interface MusicGenerationBody {
	video: string;
	snapshots: string[]; // Snapshot IDs or URLs
	duration: string; // Duration in HH:MM:SS format
	type: string;
	style: string;
}

export interface SnapshotPrompt {
	originalImage: string;
	generatedDescription: string;
	_id: string;
	timestamp: string;
}

export interface GeneratedMusic {
	generatedAt: string; // ISO 8601 date string
	url: string; // Music file URL
}

export interface MusicGenerationData {
	generatedMusic: GeneratedMusic;
	video: string; // Associated video ID or URL
	_id: string;
	user: string; // User ID
	style: string;
	type: string;
	duration: number; // Duration in seconds
	status: string;
	snapshotPrompts: SnapshotPrompt[];
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	combinedContext: string; // Context for generation
	musicBrief: string; // Brief or description for the generated music
	processingTime: number; // Time taken for generation (ms)
	__v: number; // MongoDB version key
}

export interface UserPrompts {
	prompts: MusicGenerationData[];
	filters: Record<string, unknown>; // Adjust based on filter structure
	sortBy: string; // Sorting field
	pagination: PaginationDetails;
}

// === SHARED TYPES ===

// Pagination
export interface PaginationParams {
	page?: number;
	limit?: number;
}

export interface PaginationDetails {
	totalItems: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

// Sorting
export interface SortingParams {
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

// Filtering
export interface FilterParams {
	[key: string]: any;
}

export interface PromptQueryOptions extends PaginationParams, SortingParams {
	filters?: FilterParams;
}

// Generic Paginated Response
export interface PaginatedResponse<T> {
	data: T[];
	pagination: PaginationDetails;
}

// User-related responses
export type UserResponse = ApiResponse<User>;
export type SignupResponse = ApiResponse<null>;
export type SigninResponse = ApiResponse<null>;
export type GoogleSignupResponse = ApiResponse<null>;
export type GoogleSigninResponse = ApiResponse<null>;

// Plan-related responses
export type PlanResponse = ApiResponse<Plan>;
export type ReceiptResponse = ApiResponse<Receipt>;

// Prompt-related responses
export type MusicGenerationResponse = ApiResponse<MusicGenerationData>;
export type UserPromptsResponse = ApiResponse<UserPrompts>;

// Example: Paginated Responses
export type PaginatedApiResponse<T> = ApiResponse<PaginatedResponse<T>>;
