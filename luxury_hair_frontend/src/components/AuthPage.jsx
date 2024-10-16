import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/AuthPage.css";
import { v4 as uuidv4 } from "uuid";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const formData = new FormData(event.target);
      const email = formData.get("email");
      const password = formData.get("password");

      if (!email || !password) {
        throw new Error("Please ensure all fields are entered correctly");
      }

      if (!isLogin) {
        const emailCheckResponse = await axios.get(
          `http://localhost:8080/LuxuryHairVendingSystemDB/userlogin/email-exists?email=${email}`
        );
        if (emailCheckResponse.data.exists) {
          throw new Error("Email already exists. Please log in.");
        }

        const fullName = formData.get("fullName");
        if (!fullName) {
          throw new Error("Full name is required for sign up.");
        }

        const userID = uuidv4();
        const userType = "customer";

        await axios.post(
          "http://localhost:8080/LuxuryHairVendingSystemDB/userlogin/create",
          {
            userID,
            fullName,
            email,
            password,
            userType,
          }
        );

        alert("Signup successful! Please log in.");
        toggleForm();
      } else {
        const response = await axios.post(
          "http://localhost:8080/LuxuryHairVendingSystemDB/userlogin/read",
          {
            email,
            password,
          }
        );
        
        if (response.status === 200) {
          console.log("Logged in successfully:", response.data);
          const userId = response.data.match(/UserId: (\d+)/)[1];                   
          localStorage.setItem("userId", userId);
          localStorage.setItem("isLogin", true);
          navigate(-1);
          alert("Login Successful!");
         
        } else {
          throw new Error("Invalid login credentials");
        }
        
        
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setErrorMessage("");
  };

  return (
    <div className="container">
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            {errorMessage ? <p>{errorMessage}</p> : <p>Login successful!</p>}
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input-field"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <button type="button" className="toggle-btn" onClick={toggleForm}>
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
