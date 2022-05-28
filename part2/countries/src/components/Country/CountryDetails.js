// const General
import React from "react";
import useWeatherApi from "./useWeatherApi";

const WeatherDetails = ({ weather, countryName }) => (
  <>
    <h2>Weather in {countryName}</h2>
    <p>temperature {weather?.temperature} Celsius</p>
    <img
      src={weather?.iconSrc}
      alt={`icon representing ${weather?.description}`}
    />
    <p>{weather?.description}</p>
    <p>wind {weather?.wind} m/s</p>
  </>
);

const CountryDetails = ({ country }) => {
  const {
    name: { common: countryName },
    capital,
    area,
    languages,
    flags: { png: flagImg },
    latlng: [lat, lng],
  } = country;

  const [weather, loading, error] = useWeatherApi(lat, lng);

  const langArray = Object.values(languages);

  return (
    <>
      <h2>{countryName}</h2>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <h3>Languages</h3>
      <ul>
        {langArray.map((lang) => (
          <li key={`${countryName}-${lang}`}>{lang}</li>
        ))}
      </ul>
      <img src={flagImg} alt={`${countryName}img`} />
      {!loading && !error && (
        <WeatherDetails weather={weather} countryName={countryName} />
      )}
    </>
  );
};

export default CountryDetails;
