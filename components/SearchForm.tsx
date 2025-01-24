import Form from "next/form"
import SearchFormReset from "./SearchFormReset"

const SearchForm = () => {
  return (
    <Form
      action="/"
      scroll={false}
      className="search-form"
    >
      <input
        name="query"
        className="search-input"
        placeholder="Search Stories"
      />

      <div className="flex gap-2">
        <SearchFormReset />

        <button
          type="submit"
          className="search-btn text-white"
        >
          S
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
