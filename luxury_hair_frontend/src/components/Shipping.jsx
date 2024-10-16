import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";




const ShippingPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
  };

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleTrackOrder = () => {
    alert(`Tracking order with number: ${trackingNumber}`);
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout');
    const shippingData = {
      name,
      surname,
      email,
      contactNumber,
      street,
      city,
      province,
      zipCode,
    };
    navigate("/checkout");

    axios.post('http://localhost:8080/LuxuryHairVendingSystemDB/shipping/create', shippingData)
      .then((response) => {
        alert('Shipping information saved successfully');
        console.log(response.data);
      })
      .catch((error) => {
        alert('Failed to save shipping information');
        console.error(error);
      });
  };

  

 

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', backgroundColor: '#f7f7f7', color: '#000', border: '1px solid #000', borderRadius: '10px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Contact Details</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <label style={{ flex: 1 }}>
            Name:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              style={{ width: '100%', padding: '8px', marginTop: '8px', border: '1px solid #000', borderRadius: '4px' }}
            />
          </label>
          <label style={{ flex: 1 }}>
            Surname:
            <input
              type="text"
              value={surname}
              onChange={handleSurnameChange}
              placeholder="Enter your surname"
              style={{ width: '100%', padding: '8px', marginTop: '8px', border: '1px solid #000', borderRadius: '4px' }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label style={{ flex: 1 }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              style={{ width: '100%', padding: '8px', marginTop: '8px', border: '1px solid #000', borderRadius: '4px' }}
            />
          </label>
          <label style={{ flex: 1 }}>
            Contact Number:
            <input
              type="tel"
              value={contactNumber}
              onChange={handleContactNumberChange}
              placeholder="Enter your contact number"
              style={{ width: '100%', padding: '8px', marginTop: '8px', border: '1px solid #000', borderRadius: '4px' }}
            />
          </label>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Shipping Address</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label style={{ flex: 1 }}>
            Street:
            <input
              type="text"
              value={street}
              onChange={handleStreetChange}
              placeholder="Street address"
              style={{ width: '100%', padding: '8px', marginTop: '8px', border: '1px solid #000', borderRadius: '4px' }}
            />
          </label>
          <label style={{ flex: 1 }}>
            City:
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="City"
              style={{ width: '100%', padding: '8px', marginTop: '8px', border: '1px solid #000', borderRadius: '4px' }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <label style={{ flex: 1 }}>
            Province:
            <input
              type="text"
              value={province}
              onChange={handleProvinceChange}
              placeholder="Province"
              style={{ width: '100%', padding: '8px', border: '1px solid #000', borderRadius: '4px' }}
            />
          </label>
          <label style={{ flex: 1 }}>
            Zip Code:
            <input
              type="text"
              value={zipCode}
              onChange={handleZipCodeChange}
              placeholder="Zip Code"
              style={{ width: '100%', padding: '8px', border: '1px solid #000', borderRadius: '4px' }}
            />
          </label>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Track Order:
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Tracking number"
            style={{ width: '100%', padding: '8px', marginTop: '8px', border: '1px solid #000', borderRadius: '4px' }}
          />
        </label>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handleTrackOrder} style={{ flex: 1, padding: '10px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px' }}>
            Track Order
          </button>
          <button onClick={handleCheckout} style={{ flex: 1, padding: '10px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px' }}>
            Checkout

          </button>
        </div>
      </div>
    </div>
  )
}

export default ShippingPage;