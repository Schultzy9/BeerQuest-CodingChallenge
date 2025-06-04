'use client';

import React, { useState } from 'react';
import AutosuggestInput from '../components/AutosuggestInput/AutosuggestInput';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import PaginatedTable from '../components/PaginatedTable/PaginatedTable';

export default function Home() {
  const [filters, setFilters] = useState({ name: '', city: '' });

  const handleFilter = (name: string, city: string) => {
    setFilters({ name, city });
  };

  return (
    <main
      className="
        min-h-screen
        flex flex-col items-center
        px-4 py-6 md:py-12
        transition-colors
      "
    >
      <h1
        className="
          text-3xl md:text-5xl font-bold mb-6 md:mb-10 tracking-tight
          text-[var(--accent)]
        "
      >
        Beer Quest
      </h1>
      <div className="w-full max-w-lg md:max-w-2xl mb-4 md:mb-8">
        <AutosuggestInput />
      </div>
      <div className="w-full max-w-lg md:max-w-2xl mb-4 md:mb-8">
        <FilterPanel onFilter={handleFilter} />
      </div>
      <div className="w-full max-w-full md:max-w-5xl">
        <PaginatedTable filters={filters} />
      </div>
    </main>
  );
}
