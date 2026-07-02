import { useState } from "react"

export default function WeatherClauster({data}) {
    const [isCelsius, setIsCelsius] = useState(true)

    function changeTemp() {
        if(!isCelsius) {
            const newTemp = Math.round((data.main.temp * 9 / 5) + 32);
            return newTemp
        }
    }

    return (
        <section className="weather-container">
            <div className="weather-info">
                <div className="weather-info-temp">{isCelsius === true ? Math.round(data.main.temp) : changeTemp()}</div>
                <div className="weather-info-city">{data.name}</div>
                <div className="weather-info-icon"><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Imagen del clima" /></div>
                <div className="weather-info-des">{data.weather[0].description}</div>
            </div>
            <div className="weather-change">
                <button className="wheather-b-vhanges" onClick={() => setIsCelsius(true)}>°C</button>
                <button className="wheather-b-vhanges" onClick={() => setIsCelsius(false)}>°F</button>
            </div>
        </section>
    )
}