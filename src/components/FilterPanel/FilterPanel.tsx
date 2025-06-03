'use client';

import React, { useState } from 'react';

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-end w-full"
    >
      <input
        name="name"
        type="text"
        placeholder="Filter by name"
        value={search.name}
        onChange={handleChange}
        className="flex-1 rounded border border-gray-300 bg-white dark:bg-neutral-800 px-4 py-2 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
      <input
        name="city"
        type="text"
        placeholder="Filter by city"
        value={search.city}
        onChange={handleChange}
        className="flex-1 rounded border border-gray-300 bg-white dark:bg-neutral-800 px-4 py-2 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 text-white px-6 py-2 text-base font-semibold hover:bg-blue-700 transition"
      >
        Go
      </button>
    </form>
  );
}
