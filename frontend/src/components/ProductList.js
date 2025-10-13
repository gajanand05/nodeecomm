import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const navigate = useNavigate(); 
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

 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    console.log("Deleting product id:", id);
    const response = await fetch(`http://localhost:8500/products/delete/${id}`, {
      method: "DELETE",
    });

    const result = await response.json(); // now this will be valid JSON
    if (response.ok) {
      setProducts(products.filter((item) => item._id !== id));
      alert(result.message || "Product deleted successfully");
    } else {
      alert(result.message || "Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Error deleting product");
  }
};

  return (
     <div className='re-container'>
   <div className="product-data">
     <input
        type="text"
        placeholder="Search by name or category..."
        value={searchKey}
        onChange={handleSearch}
        className="searchInput"
      />

    <table className="product-table">
      <thead>
        <tr>
          <th>Sr No.</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Company</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, index) => (
          <tr key={item.id || index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>${item.price}</td>
            <td>{item.company}</td>
            <td>
              <button className="editBtn" onClick={() => navigate(`/products/edit/${item._id}`)}>Edit</button>
              <button className="deleteBtn" onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );
}



export default ProductTable;