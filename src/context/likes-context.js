import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './'
import {
  getLikedVideoServices,
  likeVideoService,
  removeLikeService,
} from '../services'

const LikesContext = React.createContext({})

const LikesReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchLikes:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case actions.fetchLikesSuccess:
      return {
        ...state,
        isLoading: false,
        likes: action.payload.likes,
      }
    case actions.fetchLikesFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case actions.addLike:
      return {
        ...state,
        likes: action.payload,
      }
    case actions.removeLike:
      return {
        ...state,
        likes: action.payload,
      }
    default:
      return state
  }
}

const Likesprovider = ({ children }) => {
  const [myLikes, dispatchLikes] = React.useReducer(LikesReducer, {
    likes: [],
    isLoading: false,
    error: null,
  })

  const fetchLikes = async showToast => {
    dispatchLikes({ type: actions.fetchLikes })
    try {
      const likes = await getLikedVideoServices()
      return dispatchLikes({ type: actions.fetchLikesSuccess, payload: likes })
    } catch (error) {
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
      return dispatchLikes({ type: actions.fetchLikesFailure, payload: error })
    }
  }

  const addLike = async (video, showToast, setLiked) => {
    try {
      const res = await likeVideoService(video)
      dispatchLikes({ type: actions.addLike, payload: res.likes })
      return setLiked(true)
    } catch (error) {
      console.log(error)
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
    }
  }

  const removeLike = async (videoId, showToast, setLiked) => {
    try {
      const res = await removeLikeService(videoId)
      dispatchLikes({ type: actions.removeLike, payload: res.likes })
      return setLiked(false)
    } catch (error) {
      showToast({
        message: 'Oops something went wrong, please try again!',
        type: 'failed',
      })
    }
  }

  const isLiked = videoId => {
    const liked = myLikes.likes.find(like => like._id === videoId)
    return liked
  }

  return (
    <LikesContext.Provider
      value={{
        myLikes,
        dispatchLikes,
        fetchLikes,
        addLike,
        removeLike,
        isLiked,
      }}
    >
      {children}
    </LikesContext.Provider>
  )
}

Likesprovider.propTypes = {
  children: PropTypes.node.isRequired,
}

const useLikes = () => React.useContext(LikesContext)

export { Likesprovider, useLikes }
