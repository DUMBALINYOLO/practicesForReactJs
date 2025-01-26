import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = {};

    if (!validateEmail(email)) {
      formErrors.email = 'Invalid email format.';
    }

    if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage('Form submitted successfully!');
      // Reset form fields
      setEmail('');
      setPassword('');
      setErrors({});
    } else {
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (!validateEmail(email) && email) {
                setErrors((prev) => ({
                  ...prev,
                  email: 'Invalid email format.',
                }));
              } else {
                setErrors((prev) => {
                  const { email, ...rest } = prev;
                  return rest;
                });
              }
            }}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: errors.email ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
            aria-describedby="emailError"
          />
          {errors.email && (
            <p id="emailError" style={{ color: 'red', fontSize: '12px' }}>
              {errors.email}
            </p>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: errors.password ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
            aria-describedby="passwordError"
          />
          {errors.password && (
            <p id="passwordError" style={{ color: 'red', fontSize: '12px' }}>
              {errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
      {successMessage && (
        <p
          style={{
            marginTop: '20px',
            color: 'green',
            fontSize: '14px',
            textAlign: 'center',
          }}
          aria-live="polite"
        >
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default LoginForm;
