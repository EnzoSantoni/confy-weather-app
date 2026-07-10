import { useEffect, useState } from "react"


export function useTimestamp() {
    const [minutes, setMinutes] = useState(0)
    const [startTime] = useState(() => Date.now())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMinutes(Math.floor((Date.now() - startTime) / 60000))
        }, 60000);

        return () => clearInterval(intervalId)
    }, [])

    return {minutes}
}