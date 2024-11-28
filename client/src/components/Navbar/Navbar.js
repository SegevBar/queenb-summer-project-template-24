import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { useLogout } from '../../hooks/useLogout'; 
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
  const logout = useLogout(); 
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();  
  };

  return (
    <nav className={styles.appNav}>
      <Link to="/">
        <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
      </Link>
      <div className={styles.menu}>
        <Link to="/" className={styles.appLink}>Home</Link>
        {user ? (<div> <Link to="/upload" className={styles.appLink}>Upload</Link>
</div>) : (<div> <Link to="/signup" className={styles.appLink}>Upload</Link>
  </div>)}
        
        <Link to="/items/women" className={styles.appLink}>Womens</Link>
        <Link to="/items/men" className={styles.appLink}>Mens</Link>

        {user ? (
          <div> 
            <span>Hi, {user.email}! </span>
            <button class="logout-button" onClick={handleClick}>Log out</button>
          </div>
        ) : (
          <div> 
            <Link to="/login" className={styles.appAuthLinks}>Log in!     </Link>
            <Link to="/signup" className={styles.appAuthLinks}>  \ Sign up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
