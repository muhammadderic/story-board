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
      className="search-form"
    >
      <input
        name="query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        placeholder="Search Stories"
      />

      <div className="flex gap-2">
        {searchQuery && <SearchFormReset onReset={() => setSearchQuery("")} />}

        <button
          type="submit"
          className="search-btn text-white"
        >
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
