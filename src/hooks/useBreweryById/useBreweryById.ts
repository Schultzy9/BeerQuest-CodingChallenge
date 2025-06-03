import { useEffect, useState } from 'react';
import { Brewery } from '../types/brewery';

export function useBreweryById(id: string | null) {
  const [brewery, setBrewery] = useState<Brewery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setBrewery(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch brewery');
        return res.json();
      })
      .then(data => setBrewery(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { brewery, loading, error };
}
