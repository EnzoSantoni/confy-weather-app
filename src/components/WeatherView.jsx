
import ForecastList from "./ForecastList";
import WeatherCluster from "./WeatherCluster";

function WeatherView ({data, forecast, loading, error}) {
    if(loading) return <p>Cargando Clima...</p>;
    if(error) return <p>Ciudad no encontrada, intente de nuevo.</p>;
    if(!data) return <p>Buscá una ciudad para empezar.</p>;
    return (
        <>
            <WeatherCluster data={data} />
            <ForecastList forecast={forecast} />
        </>
    )
}

export default WeatherView