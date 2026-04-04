import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ✅ Check token expiry before every request
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
      // Token expired — trigger session expiry
      window.dispatchEvent(new CustomEvent("session:expired"));
      return Promise.reject(new Error("Session expired"));
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // ✅ Dispatch custom event instead of direct redirect
          // This lets AuthProvider handle it cleanly with toast
          window.dispatchEvent(new CustomEvent("session:expired"));
          break;
        case 403:
          // ✅ Dispatch forbidden event
          window.dispatchEvent(new CustomEvent("session:forbidden"));
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
      console.error("Network error - no response received");
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;