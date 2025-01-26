import React, { useState, useEffect } from 'react';
// import './SearchFilter.css'; // Add this CSS file for styling

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Date' },
    { id: 5, name: 'Elderberry' },
  ];

  // Debounce the search term to optimize filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust debounce time if needed

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search items"
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search items"
        className="search-input"
      />
      <ul className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <li key={item.id}>{item.name}</li>)
        ) : (
          <li className="no-results">No items found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
