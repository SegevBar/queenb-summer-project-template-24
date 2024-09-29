import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin(); //use the custom hook to manage login state 

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent page refresh
        await login(email, password); //call the login function with the provided email and password
    }

    return  (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <label>Email</label>
            <input type="email"
            onChange={e => setEmail(e.target.value)} //update the email state
            value={email}
            />
            <label>Password</label>
            <input type="password"
            onChange={e => setPassword(e.target.value)} //update the password state
            value={password}
           />
           <button disabled={isLoading}>Log in</button>
           {error && <div className="error">{error}</div>}
        </form>
     );
}

export default Login;