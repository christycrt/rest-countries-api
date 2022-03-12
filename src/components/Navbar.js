import { FaRegMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Navbar = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${isDark ? "bg-primary-dark" : ""}`}>
      <div className="container">
        <div className="navbar-list">
          <Link to="/">
            <h1 className={`title ${isDark ? "text-dark" : ""}`}>
              Where in the world?
            </h1>
          </Link>
          <button
            className={`theme-btn ${isDark ? "text-dark" : ""}`}
            onClick={toggleTheme}
          >
            <FaRegMoon className="dark-mode-icon" />
            Dark Mode
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
