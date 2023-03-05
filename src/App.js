import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import WeatherApp from "./WeatherApp";

import React from "react";
import WeatherForecast from "./WeatherForecast";

function App() {
  return (
    <div className="App">
      <WeatherForecast />
      <WeatherApp />
    </div>
  );
}
export default App;
