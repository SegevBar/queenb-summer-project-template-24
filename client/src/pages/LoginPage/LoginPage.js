import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import '../SignupPage/SignupPage.css';
import FirstButton from "../../components/common/FirstButton/FirstButton";
import { Link } from "react-router-dom";

// Almost the same as SignupPage.js, with minor modifications


// This function returns a login form, displaying: a title "Log in", 
// two input fields (email and password, where the password characters are not visible on the screen)
// and a button that says "Log in".
// Clicking on this button files a submit event on the form, 
// which is handled by the function 'handleSubmit' called by onSubmit.

const Login = () => {
    const [email, setEmail] = useState('') // email state
    const [password, setPassword] = useState('') // password state
    const {login, error, isLoading} = useLogin()
    const [formError, setFormError] = useState(null); // State for form validation error


    // In "return" below, we will have a button that says 'Log in' (ideal use would be after filling in an email and a password in the form).
    // This 'handleSubmit' function handles the submit event caused by clicking on that button.
    const handleSubmit = async (e) => { // async because we will want to make a request to the server
        e.preventDefault() // when we submit a form, the default event is to refresh the page, and we want to prevent that
        setFormError(null); // Reset form error before validation
        if (!email || !password) {
            setFormError('Please fill in all the fields. Always make sure that your email is valid.'); // Set form error if validation fails
            return; // Exit the function if validation fails
        }

        await login(email, password)
    }

    return (
        <div className="center-wrapper">
        <form className="creat" onSubmit={handleSubmit}>
            <h3 className="headline">Log in</h3> 

            <h1 className="subtext"> 
                Welcome back! This form is for registered users wishing to log in.
                Don't have an account yet? 
                <a href="/signup" className="link"> Sign up!</a>                </h1>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)} // when the value of this changes, we want to update the email state from above
                value={email} // if we change the state from above, we want it to reflect the change in here            
             />

            <label>Password:</label>
            <input
                type="password" // so the input is hidden on the screen (dots or something)
                onChange={(e) => setPassword(e.target.value)} // when the value of this changes, we want to update the password state from above
                value={password} // if we change the state from above, we want it to reflect the change in here            
             />

            <FirstButton disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
            </FirstButton>
            {formError && <div className="error">{formError}</div>} {/* Display form validation error */}
            {error && <div className="error">Nonexistent user, please check your credentials. 
                If you are trying to register, please <a href="/signup" className="link"> sign up.</a> 
                </div>} 

        </form>
        </div>
    )
}


export default Login;