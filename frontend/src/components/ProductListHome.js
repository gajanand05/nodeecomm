import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductListHome = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Products</h2>
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
  );
};

export default ProductListHome;