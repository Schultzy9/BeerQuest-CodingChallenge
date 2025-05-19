'use client';

import React, { useState } from 'react';

import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  onFilter: (name: string, city: string) => void;
}

export default function FilterPanel({ onFilter }: FilterPanelProps) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(name, city);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.panel}>
      <input
        type="text"
        placeholder="Filter by name"
        value={name}
        onChange={e => setName(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Filter by city"
        value={city}
        onChange={e => setCity(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Go</button>
    </form>
  );
}
