'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { Brewery } from '../../types/brewery';

export default function AutosuggestInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<Brewery[]>([]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    fetch(`/api/brewery-autosuggest?query=${debouncedQuery}`)
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(() => setSuggestions([]));
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search breweries..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="
          w-full rounded border border-[var(--primary)] bg-[var(--secondary)]
          px-4 py-2 text-base text-[var(--primary)]
          placeholder-gray-400
          focus:ring-2 focus:ring-[var(--accent)] outline-none transition
        "
      />
      {suggestions.length > 0 && (
        <ul
          className="
            absolute z-10 mt-1 w-full bg-[var(--secondary)] border border-[var(--primary)] rounded shadow
            max-h-60 overflow-auto
          "
          id="autosuggest-list"
        >
          {suggestions.map(brewery => (
            <li key={brewery.id}>
              <Link
                href={`/breweries/${brewery.id}`}
                className="
                  block px-4 py-2 text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white transition
                "
              >
                {brewery.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
