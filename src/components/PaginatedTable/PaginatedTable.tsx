import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Brewery } from '../../types/brewery';
import { useBreweryTotal } from '../../hooks/useBreweryTotal/useBreweryTotal';

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
  const handleNext = () => setPage(p => p + 1);

  if (
    filters.name.trim().toLowerCase() === 'meow' &&
    filters.city.trim().toLowerCase() === 'meow meow'
  ) {
    return (
      <div className="text-center my-8">
        <h2 className="text-2xl mb-4">🐾 Meow Meow 🐾</h2>
        <Image
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlodTU2ZmU1bHVjM3Rpc25oazNqMDh6NTF3b2tjZnh0ZHR2cGlmNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TWNF9uCH4YfhC/giphy.gif"
          alt="Cat drinking beer"
          width={800}
          height={600}
          className="mx-auto rounded"
        />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {loading && <div className="py-4 text-center text-gray-500 dark:text-gray-400">Loading...</div>}
      <table className="w-full min-w-[400px] border-collapse rounded shadow bg-white dark:bg-neutral-900 text-sm md:text-base">
        <thead>
          <tr>
            <th className="px-3 py-2 md:px-4 md:py-2 text-left font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              Brewery Name
            </th>
            <th className="px-3 py-2 md:px-4 md:py-2 text-left font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              City
            </th>
            <th className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2 text-left font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              Type
            </th>
            <th className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2 text-left font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              Country
            </th>
            <th className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2 text-left font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              Website
            </th>
            <th className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2 text-left font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {breweries.map(brewery => (
            <tr key={brewery.id} className="even:bg-gray-50 dark:even:bg-neutral-800">
              <td className="px-3 py-2 md:px-4 md:py-2 max-w-[160px] md:max-w-[220px] truncate">
                <Link href={`/breweries/${brewery.id}`} className="text-blue-700 dark:text-blue-300 hover:underline">
                  {brewery.name}
                </Link>
              </td>
              <td className="px-3 py-2 md:px-4 md:py-2">{brewery.city}</td>
              <td className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2">{brewery.brewery_type}</td>
              <td className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2">{brewery.country}</td>
              <td className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2">
                {brewery.website_url ? (
                  <a
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Visit
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td className="hidden md:table-cell px-2 py-1 md:px-4 md:py-2">{brewery.phone || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition"
          >
            Next
          </button>
        </div>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
      </div>
      {!loading && breweries.length === 0 && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No breweries found for your search.
        </div>
      )}
    </div>
  );
}
