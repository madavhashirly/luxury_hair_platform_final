// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { createHairService } from '../services/hairServicesService'; // Ensure the path is correct

// eslint-disable-next-line react/prop-types
const BookingForm = ({ selectedService }) => {
  const [details, setDetails] = useState({
    date: '',
    time: '',
    image: null,
    additionalNotes: '',
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');


  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {

    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    setTimeSlots(slots);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDetails({
      ...details,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('date', details.date);
    formData.append('time', details.time);
    formData.append('image', details.image);
    formData.append('additionalNotes', details.additionalNotes);
    formData.append('serviceType', selectedService); // Change 'service' to 'serviceType'

    try {
      const response = await createHairService(formData);
      console.log('Booking successful:', response);
      setSuccessMessage('Booking successful');
    } catch (error) {
      console.error('Error during booking:', error);
      if (error.response) {
        console.error('Server response:', error.response.data); // Log server error response
      }
      setSuccessMessage('Error during booking');
    }
  };

  return (
      <div className="booking-form-container">
        <h2>{`Booking for ${selectedService}`}</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Booking Date:
            <input
                type="date"
                name="date"
                value={details.date}
                onChange={handleChange}
                min={today}
                required
            />
          </label>
          <label>
            Booking Time:
            <select
                name="time"
                value={details.time}
                onChange={handleChange}
                required
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
              ))}
            </select>
          </label>
          <label>
            Picture of your weave before:
            <input
                type="file"
                name="image"
                onChange={handleChange}
                required
            />
          </label>
          <label>
            Leave any comment:
            <input
                type="text"
                name="additionalNotes"
                value={details.additionalNotes}
                onChange={handleChange}
            />
          </label>
          <button type="submit">Submit Booking</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
  );
};

export default BookingForm;
