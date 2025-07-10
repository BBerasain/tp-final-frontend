import React from "react";

function Search({ query, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar por título..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  );
}

export default Search;
