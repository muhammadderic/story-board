"use client"

import { useEffect, useState } from "react"
import Form from "next/form"
import { Search } from "lucide-react"
import SearchFormReset from "./SearchFormReset"

const SearchForm = ({ query }: { query?: string }) => {
  const [searchQuery, setSearchQuery] = useState(query || "");

  // Sync state when `query` prop changes
  useEffect(() => {
    setSearchQuery(query || "");
  }, [query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!searchQuery.trim()) {
      e.preventDefault(); // Prevents form submission if empty
      return;
    }
  };

  return (
    <Form
      action="/"
      scroll={false}
      onSubmit={handleSubmit}
      role="search" // ARIA role for accessibility
      className="search-form flex items-center gap-2 p-2 bg-gray-100 rounded-lg"
    >
      <input
        type="text" // Explicitly define input type
        name="query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input flex-grow p-2 rounded-md"
        placeholder="Search Stories"
        aria-label="Search stories" // ARIA label for accessibility
      />

      <div className="flex gap-2">
        {searchQuery && (
          <SearchFormReset
            onReset={() => setSearchQuery("")}
            aria-label="Clear search" // ARIA label for accessibility
          />
        )}

        <button
          type="submit"
          className="search-btn p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Submit search" // ARIA label for accessibility
        >
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
