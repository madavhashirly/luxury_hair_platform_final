// src/components/ServiceButton.js
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const ServiceButton = ({ serviceName, onClick }) => (
  <button className="service-button" onClick={() => onClick(serviceName)}>
    {serviceName}
  </button>
);

export default ServiceButton;
