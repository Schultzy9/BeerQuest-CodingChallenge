'use client';

import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  onFilter: (name: string, city: string) => void;
}

export default function FilterPanel({ onFilter }: FilterPanelProps) {
  const [search, setSearch] = useState({ name: '', city: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(search.name, search.city);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.panel}>
      <input
        name="name"
        type="text"
        placeholder="Filter by name"
        value={search.name}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="city"
        type="text"
        placeholder="Filter by city"
        value={search.city}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Go</button>
    </form>
  );
}
