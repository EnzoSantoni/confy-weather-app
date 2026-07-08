
import ForecastList from "./ForecastList";
import WeatherClauster from "./WeatherClauster";

function WeatherView ({data, forecast, loading, error}) {
    if(loading) return <p>Cargando Clima...</p>;
    if(error) return null;
    if(!data) return <p>Buscá una ciudad para empezar.</p>;
    return (
        <>
            <WeatherClauster data={data} />
            <ForecastList forecast={forecast} />
        </>
    )
}

export default WeatherView