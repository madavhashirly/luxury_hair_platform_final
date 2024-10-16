import React from "react";
import "../assets/style.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top-section">
        <div className="footer-feature">
          <i className="fas fa-shipping-fast"></i>{" "}
          <h3>Fast Shipping (5-7 work day delivery)</h3>
        </div>
        <div className="footer-feature">
          <i className="fas fa-phone-alt"></i>
          <h3>Great quality</h3>
        </div>
        <div className="footer-feature">
          <i className="fas fa-heart"></i>
          <h3>Different Choice for Wig</h3>
        </div>
        <div className="footer-feature">
          <i className="fas fa-smile"></i>
          <h3>Thank you for your support</h3>
        </div>
      </div>

      <div className="footer-bottom-section">
        <div className="footer-column">
          <h3>About LuxuryHair</h3>
          <p>
            {" "}
            Luxury Hair is a quality hair supply company based in the Cape Town,
            Western Cape South Africa. We sell top of the range quality weaves,
            raw, vietnamese, peruvian, brazilian etc.
          </p>
          <p> You can trust our products.</p>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li>+27 21 613 8022</li>
            <li>@luxuryhair on Intsagram</li>
            <li>Luxury_Hair on FaceBook </li>
            <li>@luxuryhair.co.za </li>
            
          </ul>
        </div>
        <div className="footer-column">
          <h3>All Collections</h3>
          <ul>
            <li>ALL WIGS</li>
            <li>Glueless Bob Wigs</li>
            <li>Glueless Curly Wig</li>
            <li>Lace Front Wigs</li>
            <li>Color Wig</li>
            <li>Full Frontal Wigs</li>
            <li>HD Closure Wigs</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>© 2024 Luxury Hair | luxuryhair.co.za | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
