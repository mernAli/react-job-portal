// useCache.js — In-memory API cache
//
// Stores API responses in a module-level Map so the cache
// survives re-renders and component unmounts, but clears on
// full page refresh (intentional — no stale data across sessions).
//
// Usage:
//   const { getCache, setCache, invalidate, isFresh } = useCache();
//   if (isFresh("jobs")) return getCache("jobs");
//   const data = await fetchJobs();
//   setCache("jobs", data);

const cache = new Map();
// How long a cache entry stays "fresh" in milliseconds
const DEFAULT_TTL = 60 * 1000; // 60 seconds

const useCache = (ttl = DEFAULT_TTL) => {

  // Read a cached value — returns null if not found
  const getCache = (key) => {
    const entry = cache.get(key);
    if (!entry) return null;
    return entry.data;
  };

  // Write a value into the cache with a timestamp
  const setCache = (key, data) => {
    cache.set(key, {
      data,
      cachedAt: Date.now(),
    });
  };

  // Check if a cache entry exists AND is still within TTL
  const isFresh = (key) => {
    const entry = cache.get(key);
    if (!entry) return false;
    return Date.now() - entry.cachedAt < ttl;
  };

  // Remove a specific cache entry (call after mutations)
  const invalidate = (key) => {
    cache.delete(key);
  };

  // Remove all cache entries (call on logout)
  const invalidateAll = () => {
    cache.clear();
  };

  // Get the age of a cache entry in seconds
  const getCacheAge = (key) => {
    const entry = cache.get(key);
    if (!entry) return null;
    return Math.floor((Date.now() - entry.cachedAt) / 1000);
  };

  return { getCache, setCache, isFresh, invalidate, invalidateAll, getCacheAge };
};

export default useCache;