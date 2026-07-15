import { useEffect, useRef } from "react";
import OutfitCard from "./OutfitCard";
import StatGrid from "./StatGrid";

export default function DetailSection({data, forecast, onSearch, history}) {

    const elemRef = useRef([])

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target)
                }
            })
        },{threshold: 0.8})
        elemRef.current.forEach(el => observer.observe(el));

        return () => observer.disconnect();

    }, [])

    return (
        <>
            <h2 ref={(el) => elemRef.current[0] = el}>Detalle del clima</h2>
            <div className="outfit-card" ref={(el) => elemRef.current[1] = el}>
                <OutfitCard data={data} forecast={forecast}/>
            </div>
            <div className="stat-grid">
                <StatGrid data={data} forecast={forecast}/>
            </div>
            <div className="recent-searches" ref={(el) => elemRef.current[2] = el}>
                <h3>Busquedas Recientes</h3>
                <div className="chip-row">
                    {history.slice(-10).map(c => <button className="chip" key={c} onClick={() => onSearch(c)} >{c}</button>)}
                </div>
            </div>
        </>
    )
}