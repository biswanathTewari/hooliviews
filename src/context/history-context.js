import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './'
import {
  getHistoryService,
  addToHistoryService,
  removeFromHistoryService,
  clearHistoryService,
} from '../services'

const HistoryContext = React.createContext({})

const HistoryReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchHistory:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case actions.fetchHistorySuccess:
      return {
        ...state,
        isLoading: false,
        history: action.payload.history,
      }
    case actions.fetchHistoryFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case actions.addToHistory:
      return {
        ...state,
        history: action.payload,
      }
    case actions.removeFromHistory:
      return {
        ...state,
        history: action.payload,
      }

    case actions.clearHistory:
      return {
        ...state,
        history: [],
      }
    default:
      return state
  }
}

const Historyprovider = ({ children }) => {
  const [myHistory, dispatchHistory] = React.useReducer(HistoryReducer, {
    history: [],
    isLoading: false,
    error: null,
  })

  const fetchHistory = async showToast => {
    dispatchHistory({ type: actions.fetchHistory })
    try {
      const res = await getHistoryService()
      return dispatchHistory({
        type: actions.fetchHistorySuccess,
        payload: res,
      })
    } catch (error) {
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
      return dispatchHistory({
        type: actions.fetchHistoryFailure,
        payload: error,
      })
    }
  }

  const addToHistory = async video => {
    try {
      const res = await addToHistoryService(video)
      return dispatchHistory({
        type: actions.addToHistory,
        payload: res.history,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromHistory = async (videoId, showToast) => {
    try {
      const res = await removeFromHistoryService(videoId)
      return dispatchHistory({
        type: actions.removeFromHistory,
        payload: res.history,
      })
    } catch (error) {
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
    }
  }

  const clearHistory = async showToast => {
    try {
      await clearHistoryService()
      dispatchHistory({
        type: actions.clearHistory,
      })
      return showToast({
        message: 'History cleared successfully!',
        type: 'success',
      })
    } catch (error) {
      console.log(error)
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
    }
  }

  const isWatched = videoId => {
    const watched = myHistory.history.find(video => video._id === videoId)
    return watched
  }

  return (
    <HistoryContext.Provider
      value={{
        myHistory,
        dispatchHistory,
        fetchHistory,
        addToHistory,
        removeFromHistory,
        clearHistory,
        isWatched,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

Historyprovider.propTypes = {
  children: PropTypes.node.isRequired,
}

const useHistory = () => React.useContext(HistoryContext)

export { Historyprovider, useHistory }
