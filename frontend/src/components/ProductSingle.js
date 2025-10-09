import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductSingle = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      let response = await fetch(`http://localhost:8500/products/${id}`);
      let data = await response.json();
      console.log(data)
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <img
          src="/product.jpg"
          alt={product.name}
          style={{ width: "300px", height: "300px", objectFit: "cover" }}
        />
        <div>
          <h2>{product.name}</h2>
          <h3 style={{ color: "green" }}>${product.price}</h3>
          <h3><span>Comapny:   </span>{product.company}</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
             hen an unknown printer took a galley of type and scrambled it to make a type specimen book. 
             It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
              including versions of Lorem Ipsum.</p>

               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
             hen an unknown printer took a galley of type and scrambled it to make a type specimen book. 
             It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
              including versions of Lorem Ipsum.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSingle;
