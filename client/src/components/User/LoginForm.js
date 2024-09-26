import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateAuthState } = useContext(AuthContext);

  // fetch the data of the user (email and password) after clicking the "Login" button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json(); //contains the userName and profilePic URL

    if (!response.ok) {
      setError("Incorrect username or password");
    } else {
      const name = json.userName;
      const profilePic = json.profilePic;
      updateAuthState(name, profilePic);
      setEmail("");
      setPassword("");
      alert("Welcome " + name);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <h4>
        Don't have an account?
        <Link to="/register" className={"../styles.appLink"}>
          Register
        </Link>
      </h4>
      <label>Email:</label>
      <input
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      {error && <div className="error">{error}</div>}
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
