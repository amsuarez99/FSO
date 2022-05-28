import React, { useEffect, useState } from "react";
import axios from "axios";

// app
import "./App.css";

// components
import Country from "./components/Country";
import Search from "./components/Search";

const useFetchCountries = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      const { data: fetchedCountries } = await axios.get(
        "https://restcountries.com/v3.1/all"
      );
      setCountries(fetchedCountries);
    };

    fetchCountries();
  }, []);
  return countries;
};

function App() {
  const [searchText, setSearchText] = useState("");
  const allCountries = useFetchCountries();

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const countries =
    searchText !== ""
      ? allCountries.filter((country) =>
          country.name.common.includes(searchText)
        )
      : allCountries;

  return (
    <>
      <Search text={searchText} handler={onSearchChange} />
      {countries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : countries.length === 1 ? (
        <Country country={countries[0]} detailed />
      ) : (
        countries.map((country) => (
          <Country key={country.name.common} country={country} />
        ))
      )}
    </>
  );
}

export default App;
