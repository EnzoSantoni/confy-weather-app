import { useEffect, useState } from "react";


export function useSearchHistory() {
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem("searchHistory");
        return saved ? JSON.parse(saved) : [];
    });

    function removeCity(name) {
    setHistory(history.filter((c) => c !== name))
}

    function addCity(city) {
        setHistory([...history.filter((c) => c !== city), city])
    }

    useEffect(() => {
        localStorage.setItem("searchHistory", JSON.stringify(history))
    },[history])

    return {addCity, history, removeCity}
} 