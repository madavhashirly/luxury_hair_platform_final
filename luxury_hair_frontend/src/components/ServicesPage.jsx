// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ServiceButton from "./ServiceButton";
import BookingForm from "./BookingForm";
import Navbar from "./Navbar";
import "../assets/hairServices.css";
import "../assets/style.css";

const baseUrl = import.meta.env.VITE_BACK_END_URL;

const createHairService = async (bookingDetails) => {
  try {
    const response = await fetch(`${baseUrl}/api/hairservices/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating hair service:", error);
    throw error;
  }
};

const services = [
  "Straightening of wigs",
  "Wig revamping",
  "Wig treatment",
  "Curling",
];

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    setBookingDetails(null);
  };

  const handleBookingSubmit = async (details) => {
    try {
      const bookingData = {
        service: details.service,
        image: details.file,
        date: details.date,
        time: details.time,
        additionalNotes: details.additionalNotes,
      };

      await createHairService(bookingData);

      setBookingDetails(details);
      alert(`Booking submitted successfully for ${details.service}`);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking. Please try again.");
    }
  };

  return (
      <div className="services-page">
        <Navbar />
        <div className="content">
          <h1>Hair Services</h1>
          <div className="service-buttons">
            {services.map((service, index) => (
                <ServiceButton
                    key={index}
                    serviceName={service}
                    onClick={handleServiceClick}
                />
            ))}
          </div>
          {selectedService && (
              <BookingForm
                  selectedService={selectedService}
                  onSubmit={handleBookingSubmit}
              />
          )}
          {bookingDetails && (
              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <p>Service: {bookingDetails.service}</p>
                <p>Date: {bookingDetails.date}</p>
                <p>Time: {bookingDetails.time}</p>
                <p>Additional Notes: {bookingDetails.additionalNotes}</p>
                <p>File: {bookingDetails.file.name}</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default ServicesPage;
