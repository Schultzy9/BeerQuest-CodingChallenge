'use client';

import Link from 'next/link';
import { useBreweryById } from '../../hooks/useBreweryById/useBreweryById';

interface BreweryDetailsProps {
  id: string;
}

export default function BreweryDetails({ id }: BreweryDetailsProps) {
  const { brewery, loading, error } = useBreweryById(id);

  if (loading) return <div className="py-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="py-8 text-center text-red-600">Error: {error}</div>;
  if (!brewery) return <div className="py-8 text-center text-gray-500">No brewery found.</div>;

  return (
    <div className="w-full max-w-2xl mx-auto bg-[var(--secondary)] rounded-lg shadow p-6 md:p-10 mt-6">
      <Link
        href="/"
        className="inline-block mb-4 text-[var(--accent)] hover:underline text-sm"
      >
        ← Back to Home
      </Link>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--primary)]">
        {brewery.name}
      </h2>
      {brewery.website_url && (
        <div className="mb-2">
          <a
            href={brewery.website_url}
            className="text-[var(--accent)] hover:underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {brewery.website_url}
          </a>
        </div>
      )}
      <div className="mb-2 text-[var(--primary)]"><strong>Street:</strong> {brewery.street || 'N/A'}</div>
      <div className="mb-2 text-[var(--primary)]"><strong>City:</strong> {brewery.city || 'N/A'}</div>
      <div className="mb-2 text-[var(--primary)]"><strong>State/Province:</strong> {brewery.state || 'N/A'}</div>
      <div className="mb-2 text-[var(--primary)]"><strong>Postal Code:</strong> {brewery.postal_code || 'N/A'}</div>
      <div className="mb-4 text-[var(--primary)]"><strong>Country:</strong> {brewery.country || 'N/A'}</div>
      {brewery.latitude && brewery.longitude && (
        <div className="aspect-video rounded overflow-hidden border border-[var(--primary)]">
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
