import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './'
import {
  getWatchLaterVideoServices,
  watchLaterVideoService,
  removeWatchLaterService,
} from '../services'

const WatchLaterContext = React.createContext({})

const WatchLaterReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchWatchLater:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case actions.fetchWatchLaterSuccess:
      return {
        ...state,
        isLoading: false,
        WatchLater: action.payload.watchlater,
      }
    case actions.fetchWatchLaterFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case actions.addToWatchLater:
      return {
        ...state,
        WatchLater: action.payload,
      }
    case actions.removeFromWatchLater:
      return {
        ...state,
        WatchLater: action.payload,
      }
    default:
      return state
  }
}

const WatchLaterprovider = ({ children }) => {
  const [myWatchLater, dispatchWatchLater] = React.useReducer(
    WatchLaterReducer,
    {
      WatchLater: [],
      isLoading: false,
      error: null,
    },
  )

  const fetchWatchLater = async showToast => {
    dispatchWatchLater({ type: actions.fetchWatchLater })
    try {
      const res = await getWatchLaterVideoServices()
      return dispatchWatchLater({
        type: actions.fetchWatchLaterSuccess,
        payload: res,
      })
    } catch (error) {
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
      return dispatchWatchLater({
        type: actions.fetchWatchLaterFailure,
        payload: error,
      })
    }
  }

  const addToWatchLater = async (video, showToast, setSavedForLater) => {
    try {
      const res = await watchLaterVideoService(video)
      dispatchWatchLater({
        type: actions.addToWatchLater,
        payload: res.watchlater,
      })
      return setSavedForLater(true)
    } catch (error) {
      console.log(error)
      setSavedForLater(false)
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
    }
  }

  const removeFromWatchLater = async (videoId, showToast, setSavedForLater) => {
    try {
      const res = await removeWatchLaterService(videoId)
      dispatchWatchLater({
        type: actions.removeFromWatchLater,
        payload: res.watchlater,
      })
      return setSavedForLater(false)
    } catch (error) {
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
    }
  }

  const isSavedForLater = videoId => {
    const savedForLater = myWatchLater.WatchLater.find(
      video => video._id === videoId,
    )
    return savedForLater
  }

  return (
    <WatchLaterContext.Provider
      value={{
        myWatchLater,
        dispatchWatchLater,
        fetchWatchLater,
        addToWatchLater,
        removeFromWatchLater,
        isSavedForLater,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  )
}

WatchLaterprovider.propTypes = {
  children: PropTypes.node.isRequired,
}

const useWatchLater = () => React.useContext(WatchLaterContext)

export { WatchLaterprovider, useWatchLater }
