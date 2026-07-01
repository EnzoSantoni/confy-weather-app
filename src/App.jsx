import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import WeatherView from './components/WeatherView'
import GameView from './components/GameView'
import CompareView from './components/CompareView'
import SearchBar from './components/SearchBar'
import { useWeather } from './hooks/useWeather'



function App() {
  const [city, setCity] = useState('')
  const {data, loading, error} = useWeather(city)
  function onSearch(c) {
    setCity(c)
  }



  return (
    <div className="container">
      <SearchBar onSearch={onSearch} />
    <Routes>
      <Route path="/" element={<WeatherView />}></Route>
      <Route path="/compare" element={<CompareView />}></Route>
      <Route path="/game" element={<GameView />}></Route>
    </Routes>
    </div>
  )
}

export default App
