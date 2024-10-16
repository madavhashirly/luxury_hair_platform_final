import { useEffect, useState } from "react";
import "../assets/style.css";
import "../assets/products.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the database
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACK_END_URL;

    fetch(`${baseUrl}/product/getall`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section id="products" className="products">
      <h2>Featured Products</h2>
      <div className="product-list">
        {products.slice(0, 3).map((product) => (
          <div key={product.productId} className="product-card">
            {/* Display base64-encoded image */}
            {product.image ? (
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.hairStyle}
                className="product-image"
              />
            ) : (
              <p>No Image Available</p>
            )}
            <h3>{product.hairStyle}</h3>
            <p>R{product.hairPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
