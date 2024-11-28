import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import FirstButton from "../../components/common/FirstButton/FirstButton";
import { NavLink } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();
    const [formError, setFormError] = useState(null); // State for form validation error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null); // Reset form error before validation
        if (!email || !password) {
            setFormError('Please fill in all fields.'); // Set form error if validation fails
            return; // Exit the function if validation fails
        }

        await signup(email, password); // Call signup function

        // Optional: Reset fields after successful signup
        // setEmail('');
        // setPassword('');
    }

    // const renderErrorMessage = () => {
    //     if (!error) return null;
    
    //     // Return just the message string
    //     return <p className="error-message">{error.message}</p>;
    // };


    return (
        <div className="center-wrapper">
        <form className="creat" onSubmit={handleSubmit}>

            <h3 className="headline">Sign up</h3>
            
            <h1 className="subtext"> Did you know? Only registered users can upload and sell their own
                items. Sign up here so you don't miss out!
                <em>Already have an account? <a href="/login" className="link" > Log in. </a> </em>
                </h1>

                           
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <p className="instructions">Please make sure that your email is valid and that your
                password is strong; your password should be at least 8 characters long, 
                and contain all of the following: lowercase and uppercase letters, numbers, symbols. </p> 

            <FirstButton disabled={isLoading}>
                {isLoading ? 'Signing up...' : 'Sign up'}
            </FirstButton>
            {formError && <div className="error">{formError}</div>} {/* Display form validation error */}
            {error && <div className="error">Please make sure that your email is valid and not already in use, 
                and that your password is strong. 
                </div>} 
        </form>
        </div>
    );
}

export default Signup;
