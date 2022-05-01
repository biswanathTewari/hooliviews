import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Mockman from 'mockman-js'

//import AuthRoute from './AuthRoute'
import {
  Home,
  Explore,
  Video,
  LikedVideos,
  WatchLater,
  History,
  Login,
} from '../pages'

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/liked" element={<LikedVideos />} />
      <Route path="/watchlater" element={<WatchLater />} />
      <Route path="/history" element={<History />} />
      <Route path="/watch/:id" element={<Video />} />
      <Route path="/login" element={<Login />} />

      <Route path="mockapi" element={<Mockman />} />
    </Routes>
  )
}

export default Navigation
