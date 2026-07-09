import { useState } from "react"

function SearchBar ({onSearch, addCity}) {
const [city, setCity] = useState('');

function handleSubmit(e) {
    e.preventDefault()
    onSearch(city)
    addCity(city)
    setCity('')
}

    return (
        <form className="input-search" onSubmit={handleSubmit}>
            <label htmlFor="citySearch">Busca tu Ciudad</label>
            <input type="text" name="citySearch" id="citySearch" value={city} onChange={(e) => setCity(e.target.value)}/>
            <button type="submit">Buscar</button>
        </form>
    )
}

export default SearchBar