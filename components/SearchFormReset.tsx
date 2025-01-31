"use client"

import Link from "next/link"

const SearchFormReset = ({ onReset }: { onReset: () => void }) => {
  return (
    <button type="reset" onClick={onReset}>
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
