import React, { useState } from 'react';
// import './MultiStepForm.css'; // Import the CSS file for styling

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favoriteColor: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="submission-message">Form submitted successfully!</div>;
  }

  return (
    <div className="form-container">
      <h1>Multi-Step Form</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <div className="form-group">
              <label>Favorite Color:</label>
              <select
                name="favoriteColor"
                value={formData.favoriteColor}
                onChange={handleChange}
                required
              >
                <option value="">Select a color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
              </select>
            </div>
            <div className="form-buttons">
              <button type="button" onClick={handleBack}>Back</button>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h2>Summary</h2>
            <div className="summary">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Favorite Color:</strong> {formData.favoriteColor}</p>
            </div>
            <div className="form-buttons">
              <button type="button" onClick={handleBack}>Back</button>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
