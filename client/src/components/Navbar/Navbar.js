import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/App.module.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  if (!user.isLoggedIn) {
    return (
      <nav className={styles.appNav}>
        <Link to="/" className={styles.appLink}>
          Home
        </Link>
        <Link to="/login" className={styles.appLink}>
          Log In / Register
        </Link>
      </nav>
    );
  }
  return (
    <nav className={styles.appNav}>
      <Link to="/" className={styles.appLink}>
        Home
      </Link>
      <div>
        <img
          src={user.profilePic}
          alt="profile pic"
          className={styles.appLogo}
        />
        <div>{user.userName}</div>
      </div>
    </nav>
  );
};

export default Navbar;
