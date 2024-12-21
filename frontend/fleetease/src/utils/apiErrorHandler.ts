export const handleApiError = <T>(error: any, defaultValue: T): T => {
  if (error.logout) {
    console.warn('User is logged out due to invalid token.');
    return defaultValue; // Return default value (e.g., empty array or null) when logged out
  }

  // Log other errors and rethrow them
  console.error('API Error:', error.message || error);
  throw error; // Re-throw for non-authentication errors
};