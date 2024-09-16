import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
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

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login



// import { useState } from 'react';
// import { useAuthContext } from '../hooks/useAuthContext'; // Import the hook to access AuthContext

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { dispatch } = useAuthContext(); // Destructure `dispatch` from `useAuthContext`
//   const [error, setError] = useState(null); // Optional: State for error handling

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Reset any previous error
//     setError(null);

//     try {
//       // Simulate login - Replace this with your actual authentication logic
//       const user = { email, token: 'mock-token' }; // Mock user object for demonstration

//       // Save user to localStorage (optional, for persistence)
//       localStorage.setItem('user', JSON.stringify(user));

//       // Dispatch the LOGIN action with the user data
//       dispatch({ type: 'LOGIN', payload: user });

//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <form className="login" onSubmit={handleSubmit}>
//       <h3>Log In</h3>
      
//       <label>Email address:</label>
//       <input 
//         type="email" 
//         onChange={(e) => setEmail(e.target.value)} 
//         value={email} 
//       />
//       <label>Password:</label>
//       <input 
//         type="password" 
//         onChange={(e) => setPassword(e.target.value)} 
//         value={password} 
//       />

//       <button type="submit">Log in</button>

//       {/* Display error message if there is a login error */}
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default Login;
