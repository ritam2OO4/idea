import Form from "next/form";
import SearchFormReset from '../components/SearchFormReset';
import { Search } from "lucide-react";
function SearchForm({ query }: { query?: string }) {
  return (
    <Form action="/" className="search-form">
      <input
        name="query" // Ensure the input name matches the query parameter
        defaultValue={query}
        className="search-input"
        placeholder="Search Startup"
      />
      <div className="flex gap-2">
        {query && (
          <SearchFormReset />
        )}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
}
export default SearchForm

