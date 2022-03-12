import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { FaArrowLeft } from "react-icons/fa";
import Loading from "../components/Loading";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";

const CountryDetail = () => {
  let { code } = useParams();
  const [detail, setDetail] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(function (response) {
        let data = response.data[0];
        // handle success
        var keys = [];
        for (var key in data.languages) {
          keys.push(key);
        }

        let langs = [];
        keys.forEach((key) => {
          langs.push(data.languages[key]);
        });

        let language = langs.join(", ");

        let keys_name = [];
        for (let key_name in data.name.nativeName) {
          keys_name.push(key_name);
        }

        let keys_currencies = [];
        for (let currency in data.currencies) {
          keys_currencies.push(currency);
        }

        setDetail({
          ...data,
          languagesString: language,
          nativeName:
            data.name.nativeName[keys_name[keys_name.length - 1]].common,
          currency:
            data.currencies[keys_currencies[keys_currencies.length - 1]].name,
        });
        data.borders.forEach(async (border) => {
          await axios
            .get(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => {
              setDetail((detail) => {
                return {
                  ...detail,
                  countries: detail?.countries
                    ? [...detail?.countries, res.data[0].name.common]
                    : [res.data[0].name.common],
                };
              });
            });
        });

        setIsReady(true);
      })
      .catch((err) => {
        setIsReady(true);
      });
  }, []);

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  if (!isReady) {
    return <Loading />;
  }
  if (!detail) {
    return <div>Not found</div>;
  }

  return (
    <div className="container">
      <div className="country-detail">
        <Link to="/">
          <button className={`back-btn ${isDark ? "bg-primary-dark text-dark" : ""}`}>
            <FaArrowLeft className="arrow-icon" />
            Back
          </button>
        </Link>
        <div className="detail-wrapper">
          <img className="flag" src={detail.flags.png} alt="flag" />
          <div>
            <p className="country-name">{detail.name.common}</p>
            <div className="detail">
              <div className="general-detail">
                <p>
                  <span>Native Name: </span> {detail.nativeName}
                </p>
                <p>
                  <span>Population: </span> {detail.population}
                </p>
                <p>
                  <span>Region: </span> {detail.region}
                </p>
                <p>
                  <span>Sub Region: </span> {detail.subregion}
                </p>
                <p>
                  <span>Capital: </span> {detail.capital}
                </p>
              </div>
              <div>
                <p>
                  <span>Top Level Domain: </span> {detail.tld}
                </p>
                <p>
                  <span>Currencies: </span> {detail.currency}
                </p>
                <p>
                  <span>Languages: </span> {detail.languagesString}
                </p>
              </div>
            </div>
            <div className="box-wrapper">
              <p className="border-countries">Border Countries: </p>
              {detail.countries?.map((item, key) => {
                return (
                  <div className={`box ${isDark ? "bg-primary-dark" : ""}`} key={key}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
