import { useState } from "react"
import { useTimestamp } from "../hooks/useTimestamp";

export default function WeatherCluster({data}) {
    const [isCelsius, setIsCelsius] = useState(true)
    const {minutes} = useTimestamp()

    function changeTemp() {
            const newTemp = Math.round((data.main.temp * 9 / 5) + 32);
            return newTemp
        
    }

    const today = new Date()

    return (
        <div className="weather-info-container">
            <p>
                {today.toLocaleDateString(navigator.language, {weekday: 'long',}).toLocaleUpperCase()} · {today.toLocaleDateString(navigator.language, {day: 'numeric', month: 'short'})}
            </p>
            <h2 className="weather-city">{data.name}</h2>
            <div className="weather-temp-container">
                <div className="weather-info-icon">
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Imagen del clima"/>
                </div>
                <div className="weather-temp" key={isCelsius}>
                    {isCelsius ? <div>{Math.round(data.main.temp)}<span>°C</span></div> : <div >{changeTemp()}<span>°F</span></div>}
                </div>
            </div>
            <p className="weather-des">
                {data.weather[0].description.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
            </p>
            <div className="weather-timer">
                {`Actualizado hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`}
            </div>
            <div className="weather-change">
                <button className={isCelsius ? "weather-b-changes active" : "weather-b-changes" } onClick={() => setIsCelsius(true)}>°C</button>
                <button className={isCelsius ? "weather-b-changes" : "weather-b-changes active"}  onClick={() => setIsCelsius(false)}>°F</button>
            </div>
        </div>
    )
}