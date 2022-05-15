import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Mockman from 'mockman-js'

import AuthRoute from './AuthRoute'
import {
  Home,
  Explore,
  Video,
  LikedVideos,
  WatchLater,
  History,
  Login,
  Signup,
  Playlist,
  NotFound,
} from '../pages'

const Navigation = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" exact element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/watch/:id" element={<Video />} />

      {/* auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* protected routes */}
      <Route
        path="/liked"
        element={
          <AuthRoute>
            <LikedVideos />
          </AuthRoute>
        }
      />
      <Route
        path="/watchlater"
        element={
          <AuthRoute>
            <WatchLater />
          </AuthRoute>
        }
      />
      <Route
        path="/history"
        element={
          <AuthRoute>
            <History />
          </AuthRoute>
        }
      />
      <Route
        path="/playlist"
        element={
          <AuthRoute>
            <Playlist />
          </AuthRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
      <Route path="mockapi" element={<Mockman />} />
    </Routes>
  )
}

export default Navigation
