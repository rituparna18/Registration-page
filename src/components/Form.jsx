import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobileNumber: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      address: '',
      mobileNumber: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Name" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input" placeholder="Address" />
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="form-input" placeholder="Mobile Number" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="Email" />
        <textarea name="message" value={formData.message} onChange={handleChange} className="form-textarea" placeholder="Message"></textarea>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
