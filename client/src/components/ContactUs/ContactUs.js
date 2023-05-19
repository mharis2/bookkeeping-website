import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({ type: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [areCheckboxesValid, setAreCheckboxesValid] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/services`)
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error fetching services: ', error);
            });
    }, []);

    useEffect(() => {
        // Check if at least one checkbox is selected
        setAreCheckboxesValid(selectedServices.length > 0);
    }, [selectedServices]);

    const handleServicesChange = (event) => {
        if (event.target.checked) {
            setSelectedServices([...selectedServices, event.target.value]);
        } else {
            setSelectedServices(selectedServices.filter(service => service !== event.target.value));
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate checkboxes and phone number
        if (formData.type === 'services' && !areCheckboxesValid) {
            setError('Please select at least one service.');
            return;
        } 
        if (!/^[\d]+$/.test(formData.phone)) {
            setError('Phone number can only contain numbers.');
            return;
        }
        
        // Send a POST request to the server with the form data
        axios.post(`${process.env.REACT_APP_API_URL}/contact`, formData)
            .then(response => {
                // Display the server's success message
                setSuccess(response.data.message);
                setError(null);  // Clear any previous error message
            })
            .catch(error => {
                // Display the server's error message
                setError(error.response.data.message);
                setSuccess(null);  // Clear any previous success message
            });
    };
    

    return (
        <div className="contact-form">
            <h1>Contact Us</h1>
            {error && <div className="error-message field-spacing">{error}</div>}
            {success && <div className="success-message field-spacing">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="field-spacing">
                    <label htmlFor="type-of-inquiry">Type of Inquiry</label>
                    <select
                        id="type-of-inquiry"
                        name="type"
                        value={formData.type || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Please select</option>
                        <option value="services">Services</option>
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                    </select>
                </div>
                {formData.type === "services" &&
                    <>
                        <div className="field-spacing">
                            <label className="services-label">Services Interested *</label>
                            <div className="services-checkbox">
                                {services.map(service => (
                                    <div key={service.id} className="service-item">
                                        <input
                                            type="checkbox"
                                            id={service.id}
                                            name="services"
                                            value={service.id}
                                            onChange={handleServicesChange}
                                        />
                                        <label htmlFor={service.id}>{service.title}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="field-spacing">
                            <label htmlFor="company">Company *</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="field-spacing">
                            <label htmlFor="details">Please share any details</label>
                            <textarea
                                id="details"
                                name="details"
                                value={formData.details || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                }
                {formData.type === "general" &&
                    <>
                        <div className="field-spacing">
                            <label htmlFor="company">Company *</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="field-spacing">
                            <label htmlFor="inquiry">Your Inquiry *</label>
                            <textarea
                                id="inquiry"
                                name="inquiry"
                                value={formData.inquiry || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                }
                {formData.type === "feedback" &&
                    <div className="field-spacing">
                        <label htmlFor="feedback">Your Feedback *</label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            value={formData.feedback || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                }
                <div className="field-group">
                    <div className="field-spacing">
                        <label htmlFor="firstName">First Name *</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="field-spacing">
                        <label htmlFor="lastName">Last Name *</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field-group">
                    <div className="field-spacing">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="field-spacing">
                        <label htmlFor="phone">Phone *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field-spacing submit-button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ContactUs;
