import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation
import logo from '../project-logo.png'; // Importing the logo image file (ensure the path is correct)

const Navbar = () => {
    return ( 
        <nav className="navbar">
            {/* Displaying the logo image with a fixed height and some margin for spacing */}
            <img 
                src={logo} 
                alt="Project Logo" 
                style={{ height: '40px', marginRight: '10px' }} 
            />
            {/* Main title of the website */}
            <h1>The Recipe Website</h1>
            {/* Wrapper div for the links */}
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/create">New Recipe</Link>
            </div>
        </nav>
    );
}

export default Navbar;
