'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import AutosuggestInput from './components/AutosuggestInput';
import FilterPanel from './components/FilterPanel';
import PaginatedTable from './components/PaginatedTable';

export default function Home() {

  const [filters, setFilters] = useState({ name: '', city: '' });

  const handleFilter = (name: string, city: string) => {
    setFilters({ name, city });
  };

  return (
    <main className={styles.main}>
      <h1>Beer Quest</h1>
      <AutosuggestInput />
      <FilterPanel onFilter={handleFilter} />
      <PaginatedTable filters={filters} />
    </main>
  );
}
