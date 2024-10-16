import React from "react";
import "../assets/OrderDetails.css";
import "../assets/style.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const orderSummary = {
  items: [
    {
      name: "wig1",
      quantity: 1,
      price: 2500.0,
      image: "https://via.placeholder.com/100?text=Widget+A",
    },
    {
      name: "wig2",
      quantity: 1,
      price: 300.0,
      image: "https://via.placeholder.com/100?text=Widget+B",
    },
    {
      name: "wig3",
      quantity: 3,
      price: 1500.0,
      image: "https://via.placeholder.com/100?text=Widget+C",
    },
  ],
  subtotal: 4300.0,
  shipping: 18.0,
  tax: 130.0,
  total: 4348.0,
  shippingAddress: "12 wrench street",
  paymentMethod: { type: "Visa", last4: "243" },
};



const OrderDetails = () => {
    return (
     
    <div className="order-details">
      <h2>Order Details</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderSummary.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>R{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="totals">
          <p>Subtotal: R{orderSummary.subtotal.toFixed(2)}</p>
          <p>Shipping: R{orderSummary.shipping.toFixed(2)}</p>
          <p>Tax (8%): R{orderSummary.tax.toFixed(2)}</p>
          <p>
            <strong>Total: R{orderSummary.total.toFixed(2)}</strong>
          </p>
        </div>
      </div>

      <div className="shipping-address">
        <h3>Shipping Address</h3>
        <p>{orderSummary.shippingAddress}</p>
      </div>

      <div className="payment-method">
        <h3>Payment Method</h3>
        <p>
          {orderSummary.paymentMethod.type} Ending in{" "}
          {orderSummary.paymentMethod.last4}
        </p>
      </div>

      <div className="order-agreement">
        <label>
          <input type="checkbox" /> I agree to the terms and conditions.
        </label>
        <br />
        <button className="place-order-button">Place Order</button>
      </div>
    </div>
        
  );
};

export default OrderDetails;
