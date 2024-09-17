import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import styles from './auth-form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Attempt to log in using the custom login hook
      const user = await login(email, password); // Ensure this returns a user object

      // If login is successful, navigate to the home page
      if (user) {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        autoComplete="username"
      />
      
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        autoComplete="current-password"
      />
      
      <button type="submit" disabled={isLoading}>Log in</button>

      {/* Display error message if there is a login error */}
      {error && <div className={styles.error}>{error}</div>} {/* Add some styles for the error */}
    </form>
  );
};

export default Login;
