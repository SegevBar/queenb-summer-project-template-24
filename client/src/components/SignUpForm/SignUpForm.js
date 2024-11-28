import { useState, useEffect } from 'react';
import styles from './SignUpForm.module.css';

const countries = ['Israel'];

const SignUpForm = ({ onSignUpSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Israel');
  const [cities, setCities] = useState([]); // Dynamically fetched cities
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: "Israel" }),
        });
        const result = await response.json();
        if (result && !result.error) {
          setCities(result.data); // Set the fetched cities
        } else {
          console.error('Error fetching cities:', result.msg);
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    fetchCities(); // Call the function to fetch cities
  }, []); // Empty dependency array to run this effect only once when the component mounts


  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setError('');

    if (!name || !email || !password || !phoneNumber || !city || !country) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone_number: phoneNumber, city, country }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Failed to sign up. Please try again.');
        setLoading(false);
        return;
      }

      const userData = await response.json(); // Assuming the server responds with user data on success
      console.log('userData from server:', userData);
      onSignUpSuccess(userData); // Pass name to parent component on success
    } catch (err) {
      setError('Unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      <h3 className={styles.title}>Sign Up</h3>
      <div className={styles.field}>
        <label className={`${!name && isSubmitted ? styles.errorLabel : styles.label}`}>Full Name*</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label className={`${!email && isSubmitted ? styles.errorLabel : styles.label}`}>Email*</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label className={`${!password && isSubmitted ? styles.errorLabel : styles.label}`}>Password*</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label className={`${!phoneNumber && isSubmitted ? styles.errorLabel : styles.label}`}>Phone Number*</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label className={`${!city && isSubmitted ? styles.errorLabel : styles.label}`}>City*</label>
        <select value={city} onChange={(e) => setCity(e.target.value)} required>
          <option value="" disabled>Select your city</option>
          {cities.length > 0 ? (
            cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))
          ) : (
            <option disabled>Loading cities...</option>
          )}
        </select>
      </div>
      <div className={styles.field}>
        <label className={`${!country && isSubmitted ? styles.errorLabel : styles.label}`}>Country*</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)} required>
          <option value="" disabled>Select your country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {loading && <div className={styles.loading}>Signing up... Please wait</div>}
      <div className={styles.submitButton}>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
