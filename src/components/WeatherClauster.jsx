export default function WeatherClauster({data}) {

    return (
        <section className="weather-container">
            <div className="weather-info">
                <div className="weather-info-temp">{data.main.temp}</div>
                <div className="weather-info-city">{data.name}</div>
                <div className="weather-info-icon"><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Imagen del clima" /></div>
                <div className="weather-info-des">{data.weather[0].description}</div>
            </div>
        </section>
    )
}