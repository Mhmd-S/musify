import axios from "axios";
import { toast } from "@hooks/use-toast";

export const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' 
        ? process.env.NEXT_PUBLIC_DEV_BACKEND_SERVER 
        : process.env.NEXT_PUBLIC_BACKEND_SERVER,
    withCredentials: false,
});

// Centralized error handler
const errorHandler = (error: any) => {
    const statusCode = error.response?.status;
    let errorMessage = "An unexpected error occurred.";
    let errorStatus: "error" | "warning" | "info" = "error";

    if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
    } else if (statusCode === 429) {
        errorMessage = "Too many requests. Please try again later.";
        errorStatus = "warning";
    } else if (error.code === "ERR_NETWORK") {
        errorMessage = "Network error. Please check your connection.";
        errorStatus = "warning";
    } else if (error.code === "ERR_CANCELED") {
        errorMessage = "Request was cancelled.";
        errorStatus = "info";
    } else if (error.code === "ERR_TIMEOUT") {
        errorMessage = "Request timed out. Please try again.";
        errorStatus = "warning";
    }

    // Display toast for all errors except 401 (Unauthorized)
    if (statusCode !== 401) {
        toast({
            title: errorMessage,
            variant: errorStatus as "default" | "destructive" | null | undefined,
        })
        console.error('API Error:', error);
    }

    return Promise.reject(error);
};

// Register the custom error handler to the "api" axios instance
api.interceptors.response.use(
    (response) => response,
    (error) => errorHandler(error)
);
