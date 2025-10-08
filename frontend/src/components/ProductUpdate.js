import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductUpdate = () => {
  const { id } = useParams(); // 👈 get id from route
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getProduct();
  }, [id]); // run only when id changes

  const getProduct = async () => {
    try {
      let response = await fetch(`http://localhost:8500/products/${id}`);
      response = await response.json();
      // set values in fields
      setName(response.name);
      setPrice(response.price);
      setCategory(response.category);
      setCompany(response.company);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }
    let result = await fetch(`http://localhost:8500/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category, company }),
    });
    result = await result.json();
    console.log("Updated:", result);
  };

  return (
    <div className="add-product-fields">
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter Product Name"
        className="inputbox"
      />
      {error && !name && <span className="invalid-input">Enter Valid Name</span>}

      <input
        type="text"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        placeholder="Enter Product Price"
        className="inputbox"
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid Price</span>
      )}

      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        placeholder="Enter Product Category"
        className="inputbox"
      />
      {error && !category && (
        <span className="invalid-input">Enter Valid Category</span>
      )}

      <input
        type="text"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        placeholder="Enter Product Company"
        className="inputbox"
      />
      {error && !company && (
        <span className="invalid-input">Enter Valid Company</span>
      )}

      <button onClick={updateProduct} className="add-product-button">
        Update Product
      </button>
    </div>
  );
};

export default ProductUpdate;