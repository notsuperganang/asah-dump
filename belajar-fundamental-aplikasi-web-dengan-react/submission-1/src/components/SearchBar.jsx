import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useLocale } from "../hooks/useLocale";

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const { localeText } = useLocale();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }
    setSearchParams(params);
    onSearch(keyword);
  }, [keyword, onSearch, searchParams, setSearchParams]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const clearSearch = () => {
    setKeyword("");
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder={localeText.components.searchBar.placeholder}
        className="input-glass pl-10 pr-10"
      />

      {keyword && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;