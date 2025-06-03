'use client';

import Link from 'next/link';
import { useBreweryById } from '../../hooks/useBreweryById/useBreweryById';

interface BreweryDetailsProps {
  id: string;
}

export default function BreweryDetails({ id }: BreweryDetailsProps) {
  const { brewery, loading, error } = useBreweryById(id);

  if (loading) return <div className="py-8 text-center text-gray-500 dark:text-gray-400">Loading...</div>;
  if (error) return <div className="py-8 text-center text-red-600 dark:text-red-400">Error: {error}</div>;
  if (!brewery) return <div className="py-8 text-center text-gray-500 dark:text-gray-400">No brewery found.</div>;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow p-6 md:p-10 mt-6">
      <Link
        href="/"
        className="inline-block mb-4 text-blue-700 dark:text-blue-300 hover:underline text-sm"
      >
        ← Back to Home
      </Link>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{brewery.name}</h2>
      {brewery.website_url && (
        <div className="mb-2">
          <a
            href={brewery.website_url}
            className="text-blue-600 dark:text-blue-400 hover:underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {brewery.website_url}
          </a>
        </div>
      )}
      <div className="mb-2"><strong>Street:</strong> {brewery.street || 'N/A'}</div>
      <div className="mb-2"><strong>City:</strong> {brewery.city || 'N/A'}</div>
      <div className="mb-2"><strong>State/Province:</strong> {brewery.state || 'N/A'}</div>
      <div className="mb-2"><strong>Postal Code:</strong> {brewery.postal_code || 'N/A'}</div>
      <div className="mb-4"><strong>Country:</strong> {brewery.country || 'N/A'}</div>
      {brewery.latitude && brewery.longitude && (
        <div className="aspect-video rounded overflow-hidden border border-gray-200 dark:border-neutral-700">
          <iframe
            title="Google Map"
            loading="lazy"
            className="w-full h-full"
            src={`https://maps.google.com/maps?q=${brewery.latitude},${brewery.longitude}&z=15&output=embed`}
          />
        </div>
      )}
    </div>
  );
}
