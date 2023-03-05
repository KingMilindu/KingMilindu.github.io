import React, { useState, useEffect } from "react";
import axios from "axios";
import background from "../src/clouds.jpg";

function WeatherApp() {
  const [weather, setWeather] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=6.927079&lon=79.861244&appid=47ac9477cac047d1565dc1bc10a017a6&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
    };
    fetchData();
  }, [latitude, longitude]);

  return (
    <div
      className="weather-app"
      style={{
        backgroundImage: `url(${background})`,
        /*backgroundRepeat: "no-repeat",*/
        backgroundSize: "100%",
      }}
    >
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <div className="description">{weather.weather[0].description}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
