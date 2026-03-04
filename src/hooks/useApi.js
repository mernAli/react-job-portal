import { useState, useCallback } from "react";

const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction(...args);
      setData(result);
      return { success: true, data: result };

    } catch (err) {
      // Extract the most useful error message
      const message =
        err.response?.data?.message || // Backend error message
        err.message ||                 // JS error message
        "Something went wrong";

      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  // Helper to manually clear error
  const clearError = () => setError(null);

  return { data, loading, error, execute, clearError };
};

export default useApi;