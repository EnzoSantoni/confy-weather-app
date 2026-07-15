import { useState } from "react";
import HourlyList from "./HourlyList";

export default function ForecastList({forecast}) {
    const [selectedDay, setSelectedDay] = useState("");
    const days = [...new Set(forecast.list.map((d) => d.dt_txt.split(" ")[0]))]

    const tempDays = days.map((d) => {
        const entries = forecast.list.filter((f) => f.dt_txt.startsWith(d))
        const weatherCondition = entries.reduce((acc, e) => {
            const condition = e.weather[0].main;
            acc[condition] = (acc[condition] || 0) + 1;
            return acc
        }, {})
        const weatherConditionFilter = Object.entries(weatherCondition).reduce((acc,e) => {
            const weather = acc[1] > e[1] ? acc : e;
            return weather
        }, ["", 0])
        const weatherIcon = entries.find((w) => {
            return w.weather[0].main === weatherConditionFilter[0];
            
        })
        const max = Math.round(Math.max(...entries.map((e) => e.main.temp_max)))
        const min = Math.round(Math.min(...entries.map((e) => e.main.temp_min)))
        return {day: d, max: max, min: min, icon: weatherIcon?.weather[0].icon}
    });


    return (
        <>
            <HourlyList selectedDay={selectedDay} forecast={forecast} />
            <div className="forecast-days-container">
                {tempDays.map((d) => (
                    <button className={selectedDay === d.day ? "forecast-days active" : "forecast-days"} onClick={() => selectedDay !== d.day ? setSelectedDay(d.day) : setSelectedDay("")} key={d.day}>
                        <div className="d-wday">{new Date(d.day + "T12:00:00").toLocaleDateString(navigator.language, {
                            weekday: 'short',
                        })}</div>
                        <div className="d-day">{new Date(d.day + "T12:00:00").toLocaleDateString(navigator.language, {
                            day: 'numeric',
                            month: 'short',
                        })}</div>
                        <div className="d-img"><img src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`} alt="" /></div>
                        <div className="d-temp">{d.max}° <span>/ {d.min}°</span></div>
                    </button>
                    ))}
            </div>
        </>
    )
}