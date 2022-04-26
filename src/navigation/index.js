import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Mockman from 'mockman-js'

//import AuthRoute from './AuthRoute'
import { Home, Explore } from '../pages'

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/explore" element={<Explore />} />

      <Route path="mockapi" element={<Mockman />} />
    </Routes>
  )
}

export default Navigation
