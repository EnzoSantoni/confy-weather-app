import { useState } from "react"

function SearchBar ({onSearch, history, removeCity, hasSearched}) {
const [city, setCity] = useState('');
const [isOpen, setIsOpen] = useState(false)


function handleSubmit(e) {
    e.preventDefault()
    if (city === "") return
    onSearch(city.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    setCity('')
}

    return (
        <form className="input-search" onSubmit={handleSubmit}>
            {!hasSearched && <label htmlFor="citySearch">Buscá tu Ciudad</label>}
            <div className="input-container">
                <input type="text" name="citySearch" id="citySearch" placeholder={hasSearched ? "Cambiar ciudad..." : "Buscar ciudad..."} autoComplete="off" value={city} onChange={(e) => setCity(e.target.value)} onFocus={() => setIsOpen(true)} onBlur={() => setTimeout(() => setIsOpen(false), 150)}/>
                <button type="submit">🔍</button>
            </div>
            <div className={isOpen ? "history-buttons-container open" : "history-buttons-container"}>
                    {history.slice(-5).map((n) => {
                        return <div key={n} className="chip-button">
                            <button className="history-chip" onClick={() => onSearch(n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))} type="button">{n}</button>
                            <button className="delete-chip" onClick={() => removeCity(n)} type="button" onMouseDown={(e) => e.preventDefault()} >X</button>
                    </div>})}
                </div>
        </form>
    )
}

export default SearchBar