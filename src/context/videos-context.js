import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './'
import { getVideosService } from '../services'

const VideosContext = React.createContext({})

const VideosReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchVideos:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case actions.fetchVideosSuccess:
      return {
        ...state,
        isLoading: false,
        videos: action.payload.videos,
      }
    case actions.fetchVideosFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

const VideosProvider = ({ children }) => {
  const [myVideos, dispatchVideos] = React.useReducer(VideosReducer, {
    videos: [],
    isLoading: false,
    error: null,
  })

  const fetchVideos = async () => {
    dispatchVideos({ type: actions.fetchVideos })

    try {
      const videos = await getVideosService()
      //const videos = await response.json()

      dispatchVideos({ type: actions.fetchVideosSuccess, payload: videos })
    } catch (error) {
      dispatchVideos({ type: actions.fetchVideosFailure, payload: error })
    }
  }

  return (
    <VideosContext.Provider value={{ myVideos, dispatchVideos, fetchVideos }}>
      {children}
    </VideosContext.Provider>
  )
}

VideosProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

const useVideos = () => React.useContext(VideosContext)

export { VideosProvider, useVideos }
