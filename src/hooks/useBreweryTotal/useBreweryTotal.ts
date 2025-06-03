import { useEffect, useState } from 'react';

export function useBreweryTotal(filters: { name: string; city: string }) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.name) params.append('by_name', filters.name);
    if (filters.city) params.append('by_city', filters.city);

    fetch(`https://api.openbrewerydb.org/v1/breweries/meta?${params.toString()}`)
      .then(res => res.json())
      .then(data => setTotal(data.total))
      .catch(() => setTotal(null));
  }, [filters]);

  return total;
}
