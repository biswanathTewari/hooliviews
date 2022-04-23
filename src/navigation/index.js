import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Mockman from 'mockman-js'

//import AuthRoute from './AuthRoute'
import { Home } from '../pages'

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="mockapi" element={<Mockman />} />
    </Routes>
  )
}

export default Navigation
