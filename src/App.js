import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import {WEATHER_API_URL, WEATHER_API_KEY} from './api'
import { useEffect, useState } from 'react';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&exclude=hourly`);

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse});
    })
    .catch((err) => console.log(err));
    
  }
useEffect(()=>{
  console.log("weather", currentWeather);
  console.log("Forecast", forecast);
}, [currentWeather, forecast])

  return (
    <div className="Container">
     <Search onSearchChange={handleOnSearchChange} />
     {currentWeather && <CurrentWeather data = {currentWeather} data2={forecast}/>}
     {forecast && <Forecast data = {forecast} />}
    </div>
  );
}

export default App;
