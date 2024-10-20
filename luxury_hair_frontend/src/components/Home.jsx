import React from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Products from "./FeaturedProducts.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer";
import Tips from "./Tips.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <Tips />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
