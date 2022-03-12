import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const CountriesCard = ({ item }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className={`countries-card ${isDark ? "bg-primary-dark" : ""}`}>
      <img className="flag" src={item.flags.png} alt="flag" />
      <div className={`detail ${isDark ? "text-dark" : ""}`}>
        <p className="country-name">{item.name.common}</p>
        <p>
          <span>Population:</span> {item.population}
        </p>
        <p>
          <span>Region:</span> {item.region}
        </p>
        <p>
          <span>Capital:</span> {item.capital}
        </p>
      </div>
    </div>
  );
};

export default CountriesCard;
