import axios from "axios";

// 1. Create a configured axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // Cancel request if no response in 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. REQUEST INTERCEPTOR
// Runs before every request — attaches auth token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. RESPONSE INTERCEPTOR
// Runs after every response — handles errors globally
api.interceptors.response.use(
  (response) => response, // Success — just return it
  (error) => {
    if (error.response) {
      // Server responded with 4xx or 5xx
      switch (error.response.status) {
        case 401:
          // Unauthorized — clear storage and redirect to login
          localStorage.clear();
          window.location.href = "/login";
          break;
        case 403:
          console.error("Access forbidden");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
      }
    } else if (error.request) {
      // Request was made but no response received (network error)
      console.error("Network error - no response received");
    } else {
      // Something else happened
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;