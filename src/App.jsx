import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import WeatherView from './components/WeatherView'
import GameView from './components/GameView'
import CompareView from './components/CompareView'

function App() {

  return (
    <Routes>
      <Route path="/" element={<WeatherView />}></Route>
      <Route path="/compare" element={<CompareView />}></Route>
      <Route path="/game" element={<GameView />}></Route>
    </Routes>
  )
}

export default App
