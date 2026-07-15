import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import WeatherView from './components/WeatherView'
import GameView from './components/GameView'
import CompareView from './components/CompareView'
import Sidebar from './components/Sidebar'
import { useWeather } from './hooks/useWeather'
import { useSearchHistory } from './hooks/useSearchHistory'



function App() {
  const [city, setCity] = useState('')
  const {data, forecast, loading, error} = useWeather(city)
  const {addCity, history, removeCity} = useSearchHistory()
  
  function onSearch(c) {
    setCity(c)
  }

  useEffect(() => {
    if(!data) return
    addCity(data.name)
  }, [data])



  return (
    <>
      <Sidebar />
      <main className="main-container">
      <Routes>
        <Route path="/" element={<WeatherView data={data} forecast={forecast} loading={loading} error={error} onSearch={onSearch} history={history} removeCity={removeCity} />}></Route>

        <Route path="/compare" element={<CompareView />}></Route>
        
        <Route path="/game" element={<GameView />}></Route>
      </Routes>
      </main>
    </>
  )
}

export default App
