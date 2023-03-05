import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

function WeatherForecast() {
  const [forecast, setForecast] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=47ac9477cac047d1565dc1bc10a017a6`;
      const response = await axios.get(url);
      setForecast(response.data.list.slice(0, 7));
    };
    fetchData();
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=47ac9477cac047d1565dc1bc10a017a6`;
    const response = await axios.get(url);
    setForecast(response.data.list.slice(0, 7));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="weather-forecast">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          class="form-control"
          placeholder="Enter latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          class="form-control"
          placeholder="Enter longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button class="btn btn-primary mb-2" type="submit">
          <FaSearch /> Search
        </button>
      </form>
      {forecast.map((day) => (
        <div className="day" key={day.dt}>
          <div className="date">{formatDate(day.dt)}</div>
          <div className="description">{day.weather[0].description}</div>
          <div className="temp">{Math.round(day.main.temp)}&deg;C</div>
        </div>
      ))}
    </div>
  );
}

export default WeatherForecast;
