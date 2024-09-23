import { Link } from 'react-router-dom';
import logo from '../project-logo.png'; // Adjust the path according to where you place the logo

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <img src={logo} alt="Project Logo" style={{ height: '40px', marginRight: '10px' }} />
            <h1>The Recipe Website</h1>
            <Link to="/">Home</Link>
            <Link to="/create">New Recipe</Link>
        </nav>
    );
}

export default Navbar;
