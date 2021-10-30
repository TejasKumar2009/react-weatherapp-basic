import React, { useState, useEffect } from "react";
import "./css/weather.css";

const Weather = () => {
  const [search, setSearch] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data.main);
    };

    fetchData();
  }, [search]);

  return (
    <>
      <div className="weather-wrapper">
        <div className="weather-card">
          <div className="input-box">
            <input
              onChange={handleOnChange}
              value={search}
              type="text"
              className="form__input"
              placeholder="Enter City Name Ex.Delhi"
            />
          </div>
          <div style={{ marginBottom: "4rem" }} className="weather-icon cloud">
            <i style={{ color: "yellow" }} className="fas fa-sun fa-5x"></i>
          </div>
          {!weatherData ? (
            <p className="common-text">No Results found{search.length===0 ? "" : ` for ${search}`}</p>
          ) : (
            <>
              <h1 style={{textTransform: "capitalize"}} className="common-text">{search}</h1>
              <h1 className="common-text">{weatherData.temp}° Cel</h1>
              <p className="common-text">Min : {weatherData.temp_min}° Cel</p>
              <p className="common-text">Max: {weatherData.temp_max}° Cel</p>
              <p className="common-text">
                Feels Like: {weatherData.feels_like}° Cel
              </p>
              <p className="common-text">
                Humidity: {weatherData.humidity}° Cel
              </p>
              <p className="common-text">Pressure: {weatherData.pressure} mb</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
