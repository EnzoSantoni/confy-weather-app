import { useState } from "react"
import { useTimestamp } from "../hooks/useTimestamp";
import { Icon } from "@iconify/react";
import { iconMap } from "../utils/iconMap";

export default function WeatherCluster({data}) {
    const [isCelsius, setIsCelsius] = useState(true)
    const {minutes} = useTimestamp()
    const today = new Date()
    const utcMs = today.getTime() + today.getTimezoneOffset() * 60000;
    const cityTime = new Date(utcMs + data.timezone * 1000);


    function changeTemp() {
            const newTemp = Math.round((data.main.temp * 9 / 5) + 32);
            return newTemp
        
    }

    return (
        <div className="weather-info-container">
            <p>
                {cityTime.toLocaleDateString(navigator.language, {weekday: 'long',}).toLocaleUpperCase()} · {cityTime.toLocaleDateString(navigator.language, {day: 'numeric', month: 'short'})}
            </p>
            <div className="city-localtime">
                <h2 className="weather-city">{data.name}</h2>
                <p className="time-zone">{cityTime.toLocaleTimeString(navigator.language, {hour:"2-digit", minute: "2-digit", hour12: false})}</p>
            </div>
            <div className="weather-temp-container">
                <div className="weather-info-icon">
                    <Icon icon={iconMap[data.weather[0].icon]} />
                </div>
                <div className="weather-temp" key={isCelsius}>
                    {isCelsius ? <div>{Math.round(data.main.temp)}<span>°C</span></div> : <div >{changeTemp()}<span>°F</span></div>}
                </div>
            </div>
            <p className="weather-des">
                {data.weather[0].description.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
            </p>
            <div className="weather-timer">
                {`${minutes === 0 ? "Actualizado ahora" : minutes === 1 ? `Actualizado hace ${minutes}minuto` : `Actualizado hace ${minutes} minutos`}`}
            </div>
            <div className="weather-change">
                <button className={isCelsius ? "weather-b-changes active" : "weather-b-changes" } onClick={() => setIsCelsius(true)}>°C</button>
                <button className={isCelsius ? "weather-b-changes" : "weather-b-changes active"}  onClick={() => setIsCelsius(false)}>°F</button>
            </div>
        </div>
    )
}