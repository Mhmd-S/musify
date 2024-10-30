import { toast } from 'react-toastify';

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
    // Code to execute when there is no internet connection
    toast.error('Problem connecting to server');
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server, Contact your Account administrator',
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
    toast.error(`Request error ${status}`);
    return response.data;
  } else {
    if (navigator.onLine) {
      // Code to execute when there is internet connection
      toast.error('Problem connecting to server');
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server, Contact your Account administrator',
      };
    } else {
      // Code to execute when there is no internet connection
      toast.error('No internet connection');
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server, Check your internet network',
      };
    }
  }
};

export default errorHandler;
