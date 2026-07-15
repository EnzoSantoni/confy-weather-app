import { useEffect } from "react";

function countup(el,finalValue) {
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

export default function StatGrid({data, forecast,}) {
    
    useEffect(() => {
        const cards = document.querySelectorAll(".stat-card");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const countSpan = entry.target.querySelector(".value span.count")
                if(entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                    if(countSpan) countup(entry.target.querySelector(".value span.count"), entry.target.querySelector(".value").dataset.value)
                }
            })
        },{threshold: 1})

        cards.forEach((card) => observer.observe(card))

        return () => observer.disconnect()

    }, [])

    const windDirections = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"]; 
    const windIndex = Math.round(forecast.list[0].wind.deg / 45) % 8;

    return (
        <>
            <div className={Math.round(data.main.feels_like) > 20 ? "stat-card warm" : "stat-card cool"}>
                <span className="stat-label" >Sensasion Termica</span>
                <div className="value" data-value={Math.round(data.main.feels_like)}>
                    <span className="count">{Math.round(data.main.feels_like)}</span>
                    <span className="stat-unit">°C</span>
                </div>
            </div>
            <div className="stat-card">
                <span className="stat-label" >Humedad</span>
                <div className="value" data-value={data.main.humidity}>
                    <span className="count">{data.main.humidity}</span>
                    <span className="stat-unit">%</span>
                </div>
            </div>
            <div className="stat-card">
                <span className="stat-label" >Presion</span>
                <div className="value" data-value={data.main.pressure}>
                    <span className="count">{data.main.pressure}</span>
                    <span className="stat-unit">hPa</span>
                </div>
            </div>
            <div className="stat-card cool">
                <span className="stat-label" >Viento</span>
                <div className="value" data-value={Math.round(data.wind.speed * 3.6)}>
                    <span className="count">{Math.round(data.wind.speed * 3.6)}</span>
                    <span className="stat-unit">km/h {windDirections[windIndex]}</span>
                </div>
            </div>
            {data.wind.gust && <div className="stat-card cool">
                <span className="stat-label" >Rafagas</span>
                <div className="value" data-value={Math.round(data.wind.gust * 3.6)}>
                    <span className="count">{Math.round(data.wind.gust * 3.6)}</span>
                    <span className="stat-unit">km/h</span>
                </div>
            </div>}
            <div className="stat-card">
                <span className="stat-label" > Visibilidad</span>
                <div className="value" data-value={Math.round(data.visibility / 1000)}>
                    <span className="count">{Math.round(data.visibility / 1000)}</span>
                    <span className="stat-unit">km</span>
                </div>
            </div>
            <div className="stat-card warm">
                <span className="stat-label" >Amanecer</span>
                <div className="value">
                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString(navigator.language, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })}
                </div>
            </div>
            <div className="stat-card warm">
                <span className="stat-label" >Atardecer</span>
                <div className="value">
                    {new Date(data.sys.sunset * 1000).toLocaleTimeString(navigator.language, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                })}
                </div>
            </div>
            <div className="stat-card">
                <span className="stat-label" >Prob. de lluvia</span>
                <div className="value" data-value={Math.round(forecast.list[0].pop * 100)}>
                    <span className="count">{Math.round(forecast.list[0].pop * 100)}</span>
                    <span className="stat-unit">%</span>
                </div>
            </div>
            {forecast.list[0].rain && <div className="stat-card">
                <span className="stat-label" >Lluvia esperada</span>
                <div className="value" data-value={forecast.list[0].rain['3h']}>
                    <span className="count">{forecast.list[0].rain['3h']}</span>
                    <span className="stat-unit">mm</span>
                </div>
            </div>}
        </>
    )
}