export default function HourlyList({selectedDay, forecast}) {
    if (!selectedDay) return null

    const fDay = forecast.list.filter((f) => f.dt_txt.startsWith(selectedDay))

    return (
        <div className="forecastHoursContainer">
            {fDay.map((d) => {
                return <div className="forecastHours" key={d.dt_txt}>
                    <div>{d.dt_txt.split(" ")[1].split(":").slice(0, 2).join(":")}</div>
                    <img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} alt="Image of weather by hour" />
                    <div>{Math.round(d.main.temp)}°</div>
                </div>
            })}
        </div>
    )
}