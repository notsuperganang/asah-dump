function SearchBar({ searchQuery, setSearchQuery }) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar__input"
      />
    </div>
  )
}

export default SearchBar