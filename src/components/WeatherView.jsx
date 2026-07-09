
import ForecastList from "./ForecastList";
import WeatherClauster from "./WeatherClauster";

function WeatherView ({data, forecast, loading, error, history, onSearch}) {
    if(loading) return <p>Cargando Clima...</p>;
    if(error) return null;
    if(!data) return <p>Buscá una ciudad para empezar.</p>;
    return (
        <>
            {history.map((n) => {
                return <button className="history-chip" onClick={() => onSearch(n)} key={n}>{n}</button>
            })}
            <WeatherClauster data={data} />
            <ForecastList forecast={forecast} />
        </>
    )
}

export default WeatherView