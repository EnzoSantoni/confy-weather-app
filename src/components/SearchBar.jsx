import { useState } from "react"

function SearchBar ({onSearch, history, removeCity}) {
const [city, setCity] = useState('');
const [isOpen, setIsOpen] = useState(false)


function handleSubmit(e) {
    e.preventDefault()
    if (city === "") return null
    onSearch(city)
    setCity('')
}

    return (
        <form className="input-search" onSubmit={handleSubmit}>
            <label htmlFor="citySearch">Busca tu Ciudad</label>
            <input type="text" name="citySearch" id="citySearch" value={city} onChange={(e) => setCity(e.target.value)} onFocus={() => setIsOpen(true)} onBlur={() => setTimeout(() => setIsOpen(false), 150)}/>
            {isOpen && <div>
                {history.slice(-5).map((n) => {
                    return <div key={n}>
                        <button className="history-chip" onClick={() => onSearch(n)} type="button">{n}</button>
                        <button onClick={() => removeCity(n)} type="button">X</button>
                </div>})}
            </div>}
            <button type="submit">Buscar</button>
        </form>
    )
}

export default SearchBar