import ForecastList from "./ForecastList";
import WeatherCluster from "./WeatherCluster";
import SearchBar from "./SearchBar";
import DetailSection from "./DetailSection";
import Footer from "./Footer";

function detectSeason (month, lat) {
    if(lat >= 0) {
        if (month === 11 || month === 0 || month === 1) {
            return "winter";
        } else if (month === 2 || month === 3 || month === 4) {
            return "spring";
        } else if (month === 5 || month === 6 || month === 7) {
            return "summer";
        } else {
            return "fall";
        }
    } else {
        if (month === 11 || month === 0 || month === 1) {
            return "summer";
        } else if (month === 2 || month === 3 || month === 4) {
            return "fall";
        } else if (month === 5 || month === 6 || month === 7) {
            return "winter";
        } else {
            return "spring";
        }
    }
}


function WeatherView ({data, forecast, loading, error, onSearch, history, removeCity}) {
    const hasSearched = loading || error || data !== null;
    const season = data ? detectSeason(new Date().getMonth(), data && data.coord.lat) : null;
    const seasonImages = {
        fall: "/seasons/Otonio-image.jpg",
        winter: "/seasons/Invierno-image.jpg",
        spring: "/seasons/Primavera-image.jpg",
        summer: "/seasons/Verano-image.jpg"
    }

    return (
        <>
            <section className="hero" style={season ? {backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)),url(${seasonImages[season]})`} : {}}>
                <div className="hero-scrim"></div>
                <div className={hasSearched ? "search-stage hidden" : "search-stage"}>
                    <SearchBar onSearch={onSearch} history={history} removeCity={removeCity} />
                </div>
                <div className={hasSearched ? "top-bar shown" : "top-bar"}>
                    <SearchBar onSearch={onSearch} history={history} removeCity={removeCity} hasSearched={hasSearched}/>
                </div>
                <div className={hasSearched ? 'weather-cluster shown' : "weather-cluster"}>
                    {loading && <p className="loading-weather" role="status">Cargando Clima...</p>}
                    {error && <p className="error-search" role="alert">Ciudad no encontrada, intente de nuevo.</p>}
                    {data && !loading && <WeatherCluster data={data} key={data?.name}/>}
                </div>
                <div className={hasSearched ? "forecast-strip shown" : "forecast-strip"}>
                    {data ? <ForecastList forecast={forecast} /> : null}
                    <span>Scrollea para mas detalles ↓</span>
                </div>
            </section>
            {data && !loading && <section className="detail">
                <DetailSection data={data} forecast={forecast} onSearch={onSearch} history={history} />
            </section>}
            {data && !loading && <footer className="footer">
                <Footer />
            </footer>}
            
        </>
    )
}

export default WeatherView