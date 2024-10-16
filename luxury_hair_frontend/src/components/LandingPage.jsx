import React from "react";
import { Link } from "react-router-dom";
import "../assets/LandingPage.css"; 

const LandingPage = () => {
  return (
    <div className="">
      <section id="home" className="hero">
        <div className="">
          <h2>Elevate Your Style with Luxury Hair</h2>
          <p>RAW HAIR | VIETNAMESE | BRAZILIAN | PERUVIAN</p>
          <ul className="flex align-items-center justify-center">
            <li className="px-4 bg-black e rounded-lg text-white">
              <Link to="/login" className="text-white px-4 py-4">
                Login
              </Link>
            </li>
            <li className="px-4 bg-black e rounded-lg text-white">
              <Link to="/products" className="text-white px-4 py-4">
                Continue Shoping
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
