import "./current-weather.css";

export const formatDate = (value) => {
    let date = new Date(value);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let formatDate = day + "/" + month;

    return formatDate;
  };
const CurrentWeather = ({ data, data2, onForecastClick }) => {
  window.weatherData = data;
  
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>

        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <div className="temp">
          <p className="temperature">{data.main.temp.toFixed(1)}°C</p>
          <p className="parameter-value">({data.main.temp})</p>
        </div>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{data.main.feels_like}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">
              {(data.main.pressure * 0.0009869233).toFixed(1)} atm
            </span>
          </div>
        </div>
      </div>
      <div className="footer">
        <p className="foot p-b-1">FORECAST:</p>
        <div className="footer-fc">
          {data2.list.map((item, index) => {
            if (index % 8 == 0) {
              return (
                <div className="fc" onClick={()=>{onForecastClick(index)}}>
                  <span className="fc-top">{formatDate(item.dt_txt)}</span>
                  <div className="fc-bottom">
                    <span className="fc-temp">{item.main.temp}</span>
                    <img
                      className="fc-img"
                      alt="fc"
                      src={`icons/${item.weather[0].icon}.png`}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
