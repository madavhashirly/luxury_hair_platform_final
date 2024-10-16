import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";
import "../assets/checkout.css";
import Navbar from "../components/Navbar";


const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems] = useState([
    { id: 1, name: "Product 1", price: 20 },
    { id: 2, name: "Product 2", price: 30 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  
  }; 
  navigate("/orderdetails");
 

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <header
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <h1>Luxury Hair</h1>
      </header>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div
          className="account-details"
          style={{ flex: "1", marginRight: "20px" }}
        >
          <h2>Account Details</h2>
          <form>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
                style={{ fontSize: "12px", padding: "5px" }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                style={{ fontSize: "12px", padding: "5px" }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className="form-control"
                style={{ fontSize: "12px", padding: "5px" }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Card Type:</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                required
                className="form-control"
                style={{ fontSize: "12px", padding: "5px" }}
              >
                <option value="">Select card type</option>
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="amex">American Express</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Expiry Date:</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="form-control"
                style={{ fontSize: "12px", padding: "5px" }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>CVV:</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                className="form-control"
                style={{ fontSize: "12px", padding: "5px" }}
              />
            </div>
          </form>
        </div>

        <div
          className="checkout-details"
          style={{ flex: "1", marginLeft: "20px" }}
        >
          <h2>Checkout</h2>
          <h3>Your Cart</h3>
          <ul className="cart-items" style={{ marginBottom: "10px" }}>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - R{item.price}
              </li>
            ))}
          </ul>
          <h3>Total: R{calculateTotal()}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label>Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                className="form-control"
                style={{ fontSize: "12px", padding: "5px" }}
              >
                <option value="">Select a payment method</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <button
              type="submit"
              className="submit-btn"
              style={{ fontSize: "12px", padding: "5px" }}
            >
              Complete Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
