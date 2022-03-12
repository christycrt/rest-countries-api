import { useEffect, useState } from "react";

import CountriesCard from "../components/CountriesCard";
import FilterMenu from "../components/FilterMenu";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Searchbox from "../components/Searchbox";
import axios from "axios";

const Home = () => {
  const [country, setCountry] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(function (response) {
      // handle success
      console.log(response.data);
      setCountry(response.data);
      setIsReady(true);
      setLoading(false);
    });
  }, []);

  const onFilterCountry = (region) => {
    axios
      .get(`https://restcountries.com/v3.1/region/${region}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setCountry(response.data);
      });
  };

  useEffect(() => {
    let fetchCountry;
    if (isReady) {
      if (searchCountry) {
        fetchCountry = setTimeout(() => {
          setLoading(true);
          axios
            .get(`https://restcountries.com/v3.1/name/${searchCountry}`)
            .then(function (response) {
              // handle success
              setCountry(response.data);
              setLoading(false);
            });
        }, 500);
      } else {
        fetchCountry = setTimeout(() => {
          setLoading(true);
          axios
            .get("https://restcountries.com/v3.1/all")
            .then(function (response) {
              // handle success
              setCountry(response.data);
              setLoading(false);
            });
        }, 500);
      }
    }
    return () => {
      clearTimeout(fetchCountry);
    };
  }, [searchCountry]);

  return (
    <div className="home">
      <div className="container">
        <div className="search-wrapper">
          <Searchbox searchCountry={{ searchCountry, setSearchCountry }} />
          <FilterMenu filterCountry={onFilterCountry} />
        </div>
        {loading || !isReady ? (
          <Loading />
        ) : (
          <div className="countries-wrapper">
            {country.map((item, key) => {
              return (
                <Link key={key} to={`/country/${item.cca2}`}>
                  <CountriesCard item={item} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
