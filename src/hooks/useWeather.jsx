import { useEffect, useState } from "react";
import axios from "axios";

export function useWeather(city) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!city) return

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=es`);
                setData(res.data)
            }
            catch {
                setError("No se pudo cargar el clima")
            }
            finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [city]) 

    return {data, loading, error}
}