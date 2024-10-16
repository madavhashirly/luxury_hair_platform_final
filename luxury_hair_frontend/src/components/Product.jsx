import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../assets/style.css";
import "../assets/products.css";
import Footer from "./Footer";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACK_END_URL;

    fetch(`${baseUrl}/product/getall`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>There was an error loading the products: {error.message}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="products-container">
        <h1 className="products-title">Our Products</h1>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.productId} className="product-card">
              {/* Convert byte array (base64) to an image */}
              {product.image ? (
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.hairStyle}
                  className="product-image"
                />
              ) : (
                <p>No Image Available</p>
              )}
              <p className="product-name">{product.hairTexture}</p>
              <p className="product-name">{product.hairStyle}</p>
              <p className="product-name">{product.hairSize} inches</p>
              <p className="product-name">{product.hairColor}</p>
              <p className="product-name"> {product.hairStock}</p>
              <p className="product-price">Price: {product.hairPrice}</p>
              <Link to={`/product/${product.productId}`}>Purchase</Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
