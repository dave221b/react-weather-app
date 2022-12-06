import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./forecast.css";
import { formatDate } from "../current-weather/current-weather";

const Forecast = ({ data}) => {
  const currentDay = (value) => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(value);
    let currentDay = weekday[d.getDay()];
    return currentDay;
  };

  return (
    <>
      <div className="daily">
        <span>Daily Detailed Forecast:</span>
      </div>
      <Accordion allowZeroExpanded={true}>
        {data.list.map((item, index) => {
          if (index % 8 == 0) {
            return(
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="accButton">
                    {formatDate(item.dt_txt)}(
                    {currentDay(item.dt_txt)})
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="accItem">
                  <div className="firstColumn">
                    <div className="tempName">
                      <span> Temp: </span>
                      <span> Max: </span>
                      <span> Min: </span>
                    </div>
                    <div className="temp">
                      <span>{item.main.temp}°C</span>
                      <span>{item.main.temp_max}°C</span>
                      <span>{item.main.temp_min}°C</span>
                    </div>
                  </div>
                  <div className="firstColumn">
                    <div className="tempName">
                      <span> Humidity: </span>
                      <span> Pressure: </span>
                      <span> Wind Speed: </span>
                    </div>
                    <div className="properties">
                      <span>{item.main.humidity}%</span>
                      <span>{item.main.pressure}atm</span>
                      <span>{item.wind.speed}m/s</span>
                    </div>
                  </div>
                  <div className="firstColumn">
                    <div className="tempName">
                      <span> Sky: </span>
                    </div>
                    <div className="temp">
                      <span>{item.weather[0].description}</span>
                      <img
                        className="icon-small"
                        alt="weather-small"
                        src={`./icons/${item.weather[0].icon}.png`}
                      />
                    </div>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
            )
          }
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
