import React, { useState, useEffect } from 'react';

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    };

    // Fetch all categories
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    };

    const fetchData = async () => {
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={styles.container}>
      <h1>Product Filter</h1>
      
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div style={styles.filters}>
            <label>
              Category:
              <select value={selectedCategory} onChange={handleCategoryChange} style={styles.select}>
                <option value=''>All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <input
              type='text'
              placeholder='Search by product name'
              value={searchTerm}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.grid}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.card}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={styles.image}
                />
                <h2>{product.title}</h2>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  filters: {
    marginBottom: '20px',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    marginRight: '10px',
  },
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    width: '200px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '16px',
    textAlign: 'center',
    transition: 'transform 0.3s',
    cursor: 'pointer',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
};

export default ProductFilter;
