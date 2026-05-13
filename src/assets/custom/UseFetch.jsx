import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Cache durations in milliseconds
const CACHE_DURATIONS = {
  ADS: 1000,         // 1 second - ads change frequently, fresh uploads should show immediately
  POSTS: 60000,      // 1 minute - posts can be published anytime
  STATIC: 300000,    // 5 minutes - rarely changing data
};

const getCacheDuration = (key) => {
  // Ads fetch uses 'adverts' key
  if (key === 'adverts') return CACHE_DURATIONS.ADS;
  // Posts fetch uses keys starting with 'posts_'
  if (key?.startsWith('posts_')) return CACHE_DURATIONS.POSTS;
  // Default for other data
  return CACHE_DURATIONS.STATIC;
};

const useFetch = (url, cacheKey = null) => {
  // Generate a unique cache key based on URL or provided key
  const swrKey = cacheKey ? `${url}__${cacheKey}` : url;
  const dedupingInterval = getCacheDuration(cacheKey);

  const { data, error, isLoading, mutate } = useSWR(swrKey, () => fetcher(url), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval,
    shouldRetryOnError: true,
    revalidateIfStale: true,
    revalidateOnMount: true, // Always revalidate when component mounts
    focusThrottleInterval: 5000, // 5 seconds minimum between revalidations on focus
    keepPreviousData: false, // Don't show stale data while loading
  });

  return {
    data: Array.isArray(data) ? data : [],
    loading: isLoading,
    error: error ? error.message || "Something went wrong" : null,
    refresh: mutate, // Expose manual refresh function
  };
};

export default useFetch;
