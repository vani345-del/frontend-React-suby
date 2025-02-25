import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Not_found from './vendorDashboard/Not_found'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<Not_found/>}/>
      </Routes>
      
    </div>
  )
}

export default App