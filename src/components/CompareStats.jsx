import { useEffect, useRef } from "react";

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) ** 2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

function countup(el, finalValue) {
    const initTime = performance.now()
    const duration = 1100

    function step(actualTime) {
        const progress = (actualTime - initTime) / duration;
        el.textContent = Math.round(finalValue * progress)
        if(progress < 1) {
            requestAnimationFrame(step)
        } else {
            el.textContent = finalValue
        }
    }

    requestAnimationFrame(step)
}

export default function CompareStats({data1, data2, forecast1, forecast2}) {

    const elemRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target)
                    if(entry.target === elemRef.current[1]) {
                        entry.target.querySelectorAll("span.count").forEach(span => {
                            countup(span, span.parentElement.dataset.value)
                        })
                    }
                }
            })
        }, {threshold: 0.8})

        elemRef.current.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [])

    return (
        <>
            <div className="compare-city-name" ref={(el) => elemRef.current[0] = el}>
                <span className="stats-city">{data1.name}</span>
                <span className="stats-distance">Distancia {getDistance(data1.coord.lat, data1.coord.lon, data2.coord.lat, data2.coord.lon)} km</span>
                <span className="stats-city">{data2.name}</span>
            </div>
            <div className="compare-stat-center" ref={(el) => elemRef.current[1] = el}>
                <div className="stats-data">
                    <span className="stats-numbers" data-value={Math.round(data1.main.temp)}><span className="count">{Math.round(data1.main.temp)}</span> °C</span>
                    <span className="stats-numbers" data-value={Math.round(data1.main.feels_like)}><span className="count">{Math.round(data1.main.feels_like)}</span> °C</span>
                    <span className="stats-numbers" data-value={Math.round(data1.main.humidity)}><span className="count">{Math.round(data1.main.humidity)}</span> %</span>
                    <span className="stats-numbers" data-value={Math.round(data1.wind.speed * 3.6)}><span className="count">{Math.round(data1.wind.speed * 3.6)}</span> km/h</span>
                    <span className="stats-numbers" data-value={Math.round(data1.visibility / 1000)}><span className="count">{Math.round(data1.visibility / 1000)}</span> km</span>
                    <span className="stats-numbers" data-value={Math.round(forecast1.list[0].pop * 100)}><span className="count">{Math.round(forecast1.list[0].pop * 100)}</span> %</span>
                </div>
                <div className="stats-label">
                    <span className="stat-label">Temperatura</span>
                    <span className="stat-label">Sensacion termica</span>
                    <span className="stat-label">Humedad</span>
                    <span className="stat-label">Viento</span>
                    <span className="stat-label">Visibilidad</span>
                    <span className="stat-label">Prob. de precipitacion</span>
                </div>
                <div className="stats-data">
                    <span className="stats-numbers" data-value={Math.round(data2.main.temp)}><span className="count">{Math.round(data2.main.temp)}</span> °C</span>
                    <span className="stats-numbers" data-value={Math.round(data2.main.feels_like)}><span className="count">{Math.round(data2.main.feels_like)}</span> °C</span>
                    <span className="stats-numbers" data-value={Math.round(data2.main.humidity)}><span className="count">{Math.round(data2.main.humidity)}</span> %</span>
                    <span className="stats-numbers" data-value={Math.round(data2.wind.speed * 3.6)}><span className="count">{Math.round(data2.wind.speed * 3.6)}</span> km/h</span>
                    <span className="stats-numbers" data-value={Math.round(data2.visibility / 1000)}><span className="count">{Math.round(data2.visibility / 1000)}</span> km</span>
                    <span className="stats-numbers" data-value={Math.round(forecast2.list[0].pop * 100)}><span className="count">{Math.round(forecast2.list[0].pop * 100)}</span> %</span>
                </div>
            </div>
        </>
    )
}
