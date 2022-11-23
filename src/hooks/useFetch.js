import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          setError('Something went wrong...Could not fetch the data!');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      }); 
  }, [url]);

  return { data, isLoading, error };
}