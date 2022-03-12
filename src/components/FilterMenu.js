import Select from "react-select";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const options = [
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

const FilterMenu = ({ filterCountry }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className={`filter-menu ${isDark ? "filter-menu-dark" : ""}`}>
      <Select
        options={options}
        onChange={(e) => filterCountry(e.value)}
        placeholder="Filter by Region"
      />
    </div>
  );
};

export default FilterMenu;
