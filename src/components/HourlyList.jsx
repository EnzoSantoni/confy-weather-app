import { useEffect, useState } from "react";

export default function HourlyList({selectedDay, forecast}) {

    const [lastDay, setLastDay] = useState("")

    useEffect(() => {
        if(selectedDay) setLastDay(selectedDay)
    }, [selectedDay])

    const fDay = selectedDay || lastDay ? forecast.list.filter((f) => f.dt_txt.startsWith(selectedDay || lastDay)) :[];
    

    return (
        <div className={selectedDay ? "forecast-hours-container open" : "forecast-hours-container"}>
            {fDay.map((d) => {
                return <div className="forecast-hours" key={d.dt_txt}>
                    <div className="hours-time">{d.dt_txt.split(" ")[1].split(":").slice(0, 2).join(":")}</div>
                    <img className="hours-img" src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} alt="Imagen del clima" />
                    <div className="hours-temp">{Math.round(d.main.temp)}°</div>
                </div>
            })}
        </div>
    )
}