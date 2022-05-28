import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const mapToWeatherData = ({ data }) => {
  return {
    temperature: data.main.temp,
    wind: data.wind.speed,
    description: data.weather[0].description,
    iconSrc: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
};

const useWeatherApi = (lat, lng) => {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState(undefined);
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const fetchData = async () => {
      setError(undefined);
      setLoading(true);
      try {
        const apiResponse = await axios.get(url);
        console.log("apiResponse", apiResponse);
        const weatherData = mapToWeatherData(apiResponse);
        setWeatherData(weatherData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [weatherData, loading, error];
};

export default useWeatherApi;
