import { toast } from "@hooks/use-toast";

export interface ErrorResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
      jwtExpired?: boolean;
    };
  };
}

interface ErrorHandlerResult {
  success: boolean;
  result: any;
  message: string;
}

const errorHandler = (error: ErrorResponse): ErrorHandlerResult | any => {

  const { response } = error;

  if (!response) {
    toast({
      variant: "destructive",
      title: "Connection Error",
      description: "Unable to connect to server. Please check your connection.",
    });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server. Please contact your account administrator.',
    };
  }

  if (response.data && response.data.jwtExpired) {
    const result = window.localStorage.getItem('auth');
    const jsonFile = window.localStorage.getItem('isLogout');
    const { isLogout } = (jsonFile && JSON.parse(jsonFile)) || false;
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('isLogout');
    if (result || isLogout) {
      window.location.href = '/logout';
    }
  }

  if (response.status) {
    const { status } = response;
    const errorMessage = response.data?.message || `Error ${status}: Request failed`;
    toast({
      variant: "destructive",
      title: "Error",
      description: errorMessage,
    });
    return response.data;
  } else {
    if (navigator.onLine) {
      toast({
        variant: "destructive",
        title: "Server Error",
        description: "Server connection failed. Please try again later.",
      });
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server. Please contact your account administrator.',
      };
    } else {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "No internet connection. Please check your network.",
      });
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server. Please check your internet connection.',
      };
    }
  }
};

export default errorHandler;
