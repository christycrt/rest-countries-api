import "./styles/App.scss";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CountryDetail from "./page/CountryDetail";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./contexts/ThemeContext";
import { useContext } from "react";

const App = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={`App ${isDark ? "bg-secondary-dark text-dark" : ""}`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="country">
              <Route path=":code" element={<CountryDetail />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
