import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './actions'
import {
  getPlaylistsService,
  createPlaylistService,
  deletePlaylistService,
  addToPlaylistService,
  removeFromPlaylistService,
} from '../services'

const PlaylistContext = React.createContext({})

const PlaylistReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchPlaylists:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case actions.fetchPlaylistsSuccess:
      return {
        ...state,
        isLoading: false,
        error: null,
        playlists: action.payload,
      }
    case actions.fetchPlaylistsError:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case actions.createPlaylist:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case actions.createPlaylistSuccess:
      return {
        ...state,
        isLoading: false,
        error: null,
        playlists: action.payload,
      }
    case actions.createPlaylistError:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case actions.deletePlaylist:
      return {
        ...state,
        playlists: action.payload,
        error: action.payload,
      }
    case actions.addToPlaylist: {
      const newList = state.playlists.map(playlist => {
        if (playlist._id === action.payload._id) {
          return action.payload
        }
        return playlist
      })
      return {
        ...state,
        playlists: [...newList],
      }
    }
    case actions.removeFromPlaylist: {
      const newList = state.playlists.map(playlist => {
        if (playlist._id === action.payload._id) {
          return action.payload
        }
        return playlist
      })
      return {
        ...state,
        playlists: [...newList],
      }
    }
    default:
      return state
  }
}

const PlaylistProvider = ({ children }) => {
  const [myPlaylists, dispatchPlaylists] = React.useReducer(PlaylistReducer, {
    playlists: [],
    isLoading: false,
    error: null,
  })

  const getPlaylists = async showToast => {
    try {
      dispatchPlaylists({ type: actions.fetchPlaylists })
      const res = await getPlaylistsService()
      dispatchPlaylists({
        type: actions.fetchPlaylistsSuccess,
        payload: res.playlists,
      })
    } catch (error) {
      dispatchPlaylists({ type: actions.fetchPlaylistsError, payload: error })
      showToast({
        message: 'Oops! Something went wrong.',
        type: 'failed',
      })
    }
  }

  const createPlaylist = async (playlist, showToast) => {
    try {
      dispatchPlaylists({ type: actions.createPlaylist })
      setTimeout(() => {
        ;(async () => {
          const res = await createPlaylistService(playlist)
          dispatchPlaylists({
            type: actions.createPlaylistSuccess,
            payload: res.playlists,
          })
        })()
      }, 1000) // creating a fake delay
    } catch (error) {
      dispatchPlaylists({ type: actions.createPlaylistError, payload: error })
      showToast({
        message: 'Error creating playlist',
        type: 'failed',
      })
    }
  }

  const deletePlaylist = async (id, showToast) => {
    try {
      const res = await deletePlaylistService(id)
      dispatchPlaylists({
        type: actions.deletePlaylist,
        payload: res.playlists,
      })
    } catch (error) {
      showToast({
        message: 'Oops! Something went wrong.',
        type: 'failed',
      })
    }
  }

  const addToPlaylist = async (playlistId, video, showToast) => {
    try {
      const res = await addToPlaylistService(playlistId, video)
      dispatchPlaylists({ type: actions.addToPlaylist, payload: res.playlist })
    } catch (error) {
      console.log('error', error)
      showToast({
        message: 'Oops! Something went wrong.',
        type: 'failed',
      })
    }
  }

  const removeFromPlaylist = async (playlistId, videoId, showToast) => {
    try {
      const res = await removeFromPlaylistService(playlistId, videoId)
      dispatchPlaylists({
        type: actions.removeFromPlaylist,
        payload: res.playlist,
      })
    } catch (error) {
      console.log(error)
      showToast({
        message: 'Oops! Something went wrong.',
        type: 'failed',
      })
    }
  }

  const videoExistsInPlaylist = (playlist, videoId) => {
    return playlist.videos.find(video => video._id === videoId) ? true : false
  }

  return (
    <PlaylistContext.Provider
      value={{
        myPlaylists,
        dispatchPlaylists,
        getPlaylists,
        createPlaylist,
        deletePlaylist,
        addToPlaylist,
        removeFromPlaylist,
        videoExistsInPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  )
}

PlaylistProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

const usePlaylist = () => React.useContext(PlaylistContext)

export { PlaylistProvider, usePlaylist }
