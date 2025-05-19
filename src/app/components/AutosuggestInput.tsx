'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useDebounce from '../utils/useDebounce';
import { Brewery } from '../types/brewery';

import styles from './AutosuggestInput.module.css';

export default function AutosuggestInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<Brewery[]>([]);
  const router = useRouter();

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

  const handleSelect = (brewery: Brewery) => {
    setQuery('');
    router.push(`/breweries/${brewery.id}`);
  };

  return (
  <div className={styles.container}>
    <input
      type="text"
      placeholder="Search breweries..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className={styles.input}
    />
    {suggestions.length > 0 && (
      <ul className={styles.dropdown} id="autosuggest-list">
        {suggestions.map(brewery => (
          <li
            key={brewery.id}
            className={styles.suggestion}
            onMouseDown={() => handleSelect(brewery)}
          >
            {brewery.name}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}
