import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import './signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent page refresh
        await signup(email, password, firstName, surname); 
    }

    return  (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className='grid'>
                <div className="container">
                    <label className='label-name'>First Name</label>
                    <input type="firstName"
                    onChange={e => setFirstName(e.target.value)} //update the first name state
                    value={firstName}
                    />
                </div>
                <div className="container">
                    <label className='label-name'>Surname</label>
                    <input type="surname"
                    onChange={e => setSurname(e.target.value)} //update the surname state
                    value={surname}
                    />
                </div>
            </div>
            <div className='grid'>
                <div className="container">
                    <label className='label-name'>Email</label>
                    <input type="email"
                    onChange={e => setEmail(e.target.value)} //update the email state
                    value={email}
                    />
                </div>
                <div className="container">
                    <label className='label-name'>Password</label>
                    <input type="password"
                    onChange={e => setPassword(e.target.value)} //update the password state
                    value={password}
                    />
                </div>
            </div>
            
           <button disabled={isLoading}>Register</button>
           {error && <div className="error">{error}</div>}
        </form>
     );
}

export default Signup;