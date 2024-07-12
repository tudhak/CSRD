// Generic fetch function to be called in apiService.js
import { API_BASE_URL, defaultHeaders } from "./apiConfig";
import { handleError } from "./apiErrorHandler";

// options parameter to handle methods
async function standardFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    // Essential to make sure that properly set session cookie is sent with every request
    // To use the authMiddleware for back-end protected routes
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  try {
    const response = await fetch(url, config);
    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
    return await response.json();
  } catch (error) {
    handleError(error);
    // Re-throw the error if it's not an AbortError to allow further handling
    if (!(error.name === "AbortError")) {
      throw error;
    }
  }
}

export { standardFetch };
