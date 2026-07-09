import { useEffect, useState } from "react";
import axios from "axios";


export function useWeather(city) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [forecast, setForecast] = useState(null)

    useEffect(() => {
        if(!city) return

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=es`);
                const resForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric&lang=es`)
                setData(res.data)
                setForecast(resForecast.data)
            }
            catch {
                setError(true)
            }
            finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [city]) 

    return {data, forecast, loading, error}
}