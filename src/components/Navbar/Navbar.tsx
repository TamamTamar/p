import { FaHeart, FaHome } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./Navbar.scss";
import { useAuth } from "../../contexts/AuthContext";
import Search from "../Search/Search";
import About from "../About/About";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();


  const navigate = useNavigate();
  return (
    <nav className="site-navbar">
      <div className="nav-left">
        <NavLink to="/" className="brand">
          <FaHome />
        </NavLink>
        <NavLink className="link" to="/about">About</NavLink>
        {isLoggedIn && <NavLink to="/favorites"><span style={{ display: 'inline-block' }}>Favorites</span></NavLink>}

        {isLoggedIn && user?.isBusiness && (
          <NavLink to="/my-cards">My Cards</NavLink>
        )}

        {isLoggedIn && user?.isBusiness && (
          <NavLink to="/create-card">Create card</NavLink>
        )}
      </div>
     
      <div className="nav-right">
    
        {!isLoggedIn && <NavLink className="link" to="/login">login</NavLink>}
        {isLoggedIn && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
          
        )}


        {/* {isLoggedIn && <NavLink to="/profile"> Profile</NavLink>} */}


        <DarkModeToggle />
        <Search/>
      </div>
    </nav>
  );
};

export default Navbar;
