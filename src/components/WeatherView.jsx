import ForecastList from "./ForecastList";
import WeatherCluster from "./WeatherCluster";
import SearchBar from "./SearchBar";
import DetailSection from "./DetailSection";
import Footer from "./Footer";

function WeatherView ({data, forecast, loading, error, onSearch, history, removeCity}) {
    const hasSearched = loading || error || data !== null;
    
    return (
        <>
            <section className="hero">
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