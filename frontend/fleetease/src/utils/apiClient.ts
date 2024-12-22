import axios from 'axios';
import { removeStoredToken } from '../utils/authUtils';

const apiClient = axios.create({
  //baseURL: 'http://your-api-url.com', // Replace with your API URL
});

// Function to handle user logout passed from context
let logoutCallback: (() => void) | null = null;

// Function to set the logout handler
export const setLogoutHandler = (logoutHandler: () => void) => {
  logoutCallback = logoutHandler;
};

// Interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Invalid or expired token. Logging out user...');
      removeStoredToken();
      if (logoutCallback) logoutCallback();
      // Add a custom property to the error to indicate logout
      error.logout = true;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
