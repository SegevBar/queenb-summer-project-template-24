import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/global.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Access login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Used to redirect user after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages


    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const { authToken, user } = data;

      // Call the login function from context with token and user data
      login(user, authToken);

      // Set success message and redirect after a short delay
      setSuccessMessage(`Welcome back, ${user.name}`);
      setTimeout(() => {
        navigate('/'); // Redirect to the main page
      }, 2000); // 2 seconds delay before redirecting
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
       {/* Display error message if login fails */}
       {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {/* Display success message when login is successful */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </div>
  );
};

export default LoginPage;
