import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Searchbox = ({ searchCountry }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="search">
      <FaSearch className={`search-icon ${isDark ? "text-dark" : ""}`} />
      <input
        className={`search-box ${isDark ? "bg-primary-dark text-dark" : ""}`}
        type="text"
        value={searchCountry.searchCountry}
        onChange={(e) => {
          searchCountry.setSearchCountry(e.target.value);
        }}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default Searchbox;
