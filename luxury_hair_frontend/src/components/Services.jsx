// src/components/Services.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ServiceButton from './ServiceButton';
import BookingForm from './BookingForm';
import { createHairService } from "../services/hairServicesService";
import './HairServices.css';

const services = [
    'Straightening of wigs',
    'Wig revamping',
    'Wig treatment',
    'Curling',
];

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);

    const handleServiceClick = (serviceName) => {
        setSelectedService(serviceName);
        setBookingDetails(null); // Reset booking details on new selection
    };

    const handleBookingSubmit = async (details) => {
        try {
            alert(details.date)
            await createHairService({
                id: 1,
                image: details.file,
                date: details.date,
                time: details.time,
                additionalNotes: details.additionalNotes,

            });
            alert("After create")
            setBookingDetails(details);
            alert(`Booking submitted successfully for ${details.service}`);
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('There was an error submitting your booking. Please try again.');
        }
    };

    return (
        <div className="services-page">
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
    );
};

export default ServicesPage;
