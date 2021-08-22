import { useEffect, useState } from 'react';

const useFetch = (url, reFetch) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((err) =>
          setError(err ? err?.response?.data?.error : 'Server error')
        );

      setIsLoading(false);
    };
    fetchData();
  }, [url, reFetch]);
  return { data, isLoading, error };
};

export default useFetch;
