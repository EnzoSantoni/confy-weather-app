import { useEffect, useState } from "react";


export function useSearchHistory() {
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem("searchHistory");
        return saved ? JSON.parse(saved) : [];
    });

    function addCity(city) {
        history.includes(city) ? history : setHistory([...history, city]);
    }

    useEffect(() => {
        localStorage.setItem("searchHistory", JSON.stringify(history))
    },[history])

    return {addCity, history}
} 