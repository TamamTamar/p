import { FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import Search from "../Search/Search";
import "./Navbar.scss";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();


  const navigate = useNavigate();
  return (
    <nav className="site-navbar ">
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
          {isLoggedIn && (
            <div className="user-menu">
              <button className="user-name-button">
                {user && (
                  <span>
                    {user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)}{' '}
                    {user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)}
                  </span>
                )}
              </button>
              <div className="user-menu-content">
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
              </div>
        )}


        {/* {isLoggedIn && <NavLink to="/profile"> Profile</NavLink>} */}


        <DarkModeToggle />
        <Search/>
      </div>
    </nav>
  );
};

export default Navbar;
