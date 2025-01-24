"use client"

import Link from "next/link"

const SearchFormReset = () => {
  return (
    <button type="reset">
      <Link
        href="/"
        className="search-btn text-white"
      >
        X
      </Link>
    </button>
  )
}

export default SearchFormReset
