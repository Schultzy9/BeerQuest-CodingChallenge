import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Brewery } from '../../types/brewery';
import { useBreweryTotal } from '../../hooks/useBreweryTotal/useBreweryTotal';
import styles from './PaginatedTable.module.css';

interface PaginatedTableProps {
  filters: { name: string; city: string };
  pageSize?: number;
}

export default function PaginatedTable({ filters, pageSize = 15 }: PaginatedTableProps) {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalBreweries = useBreweryTotal(filters);
  const totalPages = totalBreweries ? Math.ceil(totalBreweries / pageSize) : 1;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.name) params.append('by_name', filters.name);
    if (filters.city) params.append('by_city', filters.city);
    params.append('per_page', pageSize.toString());
    params.append('page', page.toString());

    fetch(`/api/breweries?${params.toString()}`)
      .then(res => res.json())
      .then(data => setBreweries(data))
      .finally(() => setLoading(false));
  }, [filters, page, pageSize]);

  const handlePrevious = () => setPage(p => p - 1);
  const handleNext = () => setPage((p) => p + 1);

  if (
    filters.name.trim().toLowerCase() === 'meow' &&
    filters.city.trim().toLowerCase() === 'meow meow'
  ) {
    return (
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <h2>🐾 Meow Meow 🐾</h2>
        <Image
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlodTU2ZmU1bHVjM3Rpc25oazNqMDh6NTF3b2tjZnh0ZHR2cGlmNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TWNF9uCH4YfhC/giphy.gif"
          alt="Cat drinking beer"
          width={800}
          height={600}
        />
      </div>
    );
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Brewery Name</th>
            <th>Type</th>
            <th>City</th>
            <th>Country</th>
            <th>Website</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {breweries.map(brewery => (
            <tr key={brewery.id}>
              <td>
                <Link href={`/breweries/${brewery.id}`} className={styles.linkButton}>
                  {brewery.name}
                </Link>
              </td>
              <td>{brewery.brewery_type}</td>
              <td>{brewery.city}</td>
              <td>{brewery.country}</td>
              <td>
                {brewery.website_url ? (
                  <a href={brewery.website_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Visit
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>{brewery.phone || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
        <button
          className={styles.button}
          onClick={handleNext}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
