import { Link } from 'react-router-dom'; // Import Link component
import logo from '../project-logo.png';  // Import the logo
import styles from '../styles/App.module.css'; // Import styles from App.module.css

const Navbar = ({ user, handleClick }) => {
  return (
    <nav className={styles.appHeader}> {/* Apply the appHeader style */}
      <img 
        src={logo} 
        alt="Project Logo" 
        className={styles.appLogo} /> {/* Apply the appLogo style */}
      
      <div className={styles.appNav}> {/* Apply appNav style */}
        <Link to="/" className={styles.appLink}>Home</Link> {/* Home link */}
        
        {/* Conditional rendering based on the user login status */}
        {!user ? (
          <div>
            <Link to="/login" className={styles.appLink}>Log in</Link> {/* Log in */}
            <Link to="/signup" className={styles.appLink}>Sign up</Link> {/* Sign up */}
          </div>
        ) : (
          <div className={styles.userSection}> {/* Apply userSection style */}
            {/* Show 'Create Recipe' link if user is logged in */}
            <Link to="/create-recipe" className={styles.appLink}>Create Recipe</Link>
            <span>{user.email}</span> {/* Display user email */}
            <button onClick={handleClick} className={styles.logoutButton}>Log out</button> {/* Log out */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
