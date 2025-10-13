import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductListHome = () => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let response = await fetch("http://localhost:8500/products");
      let data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


    // Handle search input change
  const handleSearch = async (e) => {
    const key = e.target.value;
    setSearchKey(key);

    if (key.trim() === "") {
      fetchProducts(); // if empty, show all products
      return;
    }

    try {
      let response = await fetch(`http://localhost:8500/products/search/${key}`);
      if (response.ok) {
        let data = await response.json();
        setProducts(data);
      } else {
        setProducts([]); // no results
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className='re-container'>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <div className="product-header">
      <h2>Products</h2>
         <input
        type="text"
        placeholder="Search by name or category..."
        value={searchKey}
        onChange={handleSearch}
        className="searchInput"
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />
      </div>
      <div className="product-grid">
        {products.map((item) => (
          <Link
            to={`/products/${item._id}`}
            key={item._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="product-card">
              <img src="/product.jpg" alt={item.name} />
              <div className="product-name">{item.name}</div>
              <div className="product-price">${item.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductListHome;