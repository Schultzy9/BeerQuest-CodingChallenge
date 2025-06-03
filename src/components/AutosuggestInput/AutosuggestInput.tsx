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
          w-full rounded border border-gray-300 bg-white dark:bg-neutral-800
          px-4 py-2 text-base text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-blue-500 outline-none
          placeholder-gray-400 dark:placeholder-gray-500
          transition
        "
      />
      {suggestions.length > 0 && (
        <ul
          className="
            absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded shadow
            max-h-60 overflow-auto
          "
          id="autosuggest-list"
        >
          {suggestions.map(brewery => (
            <li key={brewery.id}>
              <Link
                href={`/breweries/${brewery.id}`}
                className="
                  block px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900
                  transition
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
