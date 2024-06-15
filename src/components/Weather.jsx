/*eslint no-undef: ["error", { "typeof": true }] */
import React, { useState } from "react";
import "./Weather.css";
import searchImg from "../images/search.png";
import rainImg from "../images/rain.png";
import cloudsImg from "../images/clouds.png";
import drizzleImg from "../images/drizzle.png";
import snowImg from "../images/snow.png";
import clearImg from "../images/clear.png";
import mistImg from "../images/mist.png";
import humidityImg from "../images/humidity.png";
import windImg from "../images/wind.png";

function Weather() {
  const apiKey = "83de63f52186baf4720f9a05b9a4278e";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  async function checkWeather(city) {
    const respones = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await respones.json();
    setWeather(data);
  }

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchBtn = () => {
    checkWeather(search.valueOf());
    // search.value == null;
  };

  return (
    <div>
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder=" Write City Name..."
            spellCheck="false"
            autoFocus
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button>
            <img src={searchImg} onClick={searchBtn} alt="search" />
          </button>
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            {/* {respones.status === 404 ?<div className="error" style={{ display: "block" }}>
              <p>invalid city name...</p>
            </div> : ''} */}
            <div className="weather" style={{ display: "block" }}>
              <img
                src={
                  (weather.weather[0].main = "Clair"
                    ? clearImg
                    : (weather.weather[0].main = "Rain"
                        ? rainImg
                        : (weather.weather[0].main = "Clouds"
                            ? cloudsImg
                            : (weather.weather[0].main = "Drizzle"
                                ? drizzleImg
                                : (weather.weather[0].main = "Snow"
                                    ? snowImg
                                    : (weather.weather[0].main = "Mist"
                                        ? mistImg
                                        : ""))))))
                }
                className="weather-icon"
                alt="weather"
              />
              <h1 className="temp">
                {weather.main.temp}
                <sup>°C</sup>
              </h1>
              <h2 className="city">{weather.name}</h2>
              <div className="details">
                <div className="col">
                  <img src={humidityImg} alt="" />
                  <div>
                    <p className="humidity">{weather.main.humidity}%</p>
                    <p>humidity</p>
                  </div>
                </div>
                <div className="col">
                  <img src={windImg} alt="" />
                  <div>
                    <p className="wind">{weather.wind.speed} km/h</p>
                    <p>wind spead</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : // null
        weather.cod !== 404 ? (
          <div className="error" style={{ display: "block" }}>
            <p>{weather.message}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Weather;
