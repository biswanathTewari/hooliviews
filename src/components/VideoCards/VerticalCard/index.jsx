import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import propTypes from 'prop-types'

import { useLikes, useWatchLater, useGlobalState } from '../../../context'
import './styles.scss'

const VerticalCard = ({ video, isLoggedIn }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useGlobalState()
  const {
    title = 'Loading...',
    creator = 'loading...',
    img,
    duration,
    creatorImg,
    _id: id,
  } = video
  const {
    myLikes: { likes },
    addLike,
    removeLike,
    isLiked,
  } = useLikes()
  const {
    myWatchLater: { WatchLater },
    addToWatchLater,
    removeFromWatchLater,
    isSavedForLater,
  } = useWatchLater()
  const [liked, setLiked] = React.useState(false)
  const [savedForLater, setSavedForLater] = React.useState(false)
  const shortTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title

  const navigationHandler = e => {
    if (e.target.classList.contains('VerticalCard__icon')) return
    navigate(`/watch/${id}`)
  }

  const protectedFeat = (feature, ...rest) => {
    if (!isLoggedIn) return navigate('/login', { state: { from: location } })
    return feature(...rest)
  }

  React.useEffect(() => {
    if (isLiked(id)) setLiked(true)
    else setLiked(false)

    if (isSavedForLater(id)) setSavedForLater(true)
    else setSavedForLater(false)
  }, [likes, WatchLater])

  return (
    <div className="VerticalCard" onClick={navigationHandler}>
      <div className="VerticalCard__imgwrapper">
        {img && (
          <img
            src={img}
            alt="video preview"
            className="VerticalCard__img img-responsive"
          />
        )}
      </div>

      <div className="VerticalCard__info">
        <div className="VerticalCard__description">
          <h3 className="text-rg">{creator ? creator : 'loading...'}</h3>
          <div className="VerticalCard__creator">
            <div className="VerticalCard__avatarwrapper">
              {creatorImg && (
                <img
                  src={creatorImg}
                  alt="creator avatar"
                  className="avatar avatar-large img-responsive"
                />
              )}
            </div>
          </div>
        </div>
        <h1 className="VerticalCard__title">
          {shortTitle ? shortTitle : 'Loading...'}
        </h1>
        <div className="flex-wrap">
          <p className="VerticalCard__views">53K views</p>
          <div
            className="VerticalCard__iconswrapper"
            onClick={e => e.stopPropagation()}
          >
            {liked ? (
              <div
                className="VerticalCard__icon"
                onClick={() => removeLike(id, showToast, setLiked)}
              >
                <i className="fas fa-thumbs-up"></i>
                <p>unlike</p>
              </div>
            ) : (
              <div
                className="VerticalCard__icon"
                onClick={() =>
                  protectedFeat(addLike, video, showToast, setLiked)
                }
              >
                <i className="far fa-thumbs-up"></i>
                <p>like</p>
              </div>
            )}

            {savedForLater ? (
              <div
                className="VerticalCard__icon"
                onClick={() =>
                  removeFromWatchLater(id, showToast, setSavedForLater)
                }
              >
                <i className="fas fa-clock"></i>
                <p>watch later</p>
              </div>
            ) : (
              <div
                className="VerticalCard__icon"
                onClick={() =>
                  protectedFeat(
                    addToWatchLater,
                    video,
                    showToast,
                    setSavedForLater,
                  )
                }
              >
                <i className="far fa-clock"></i>
                <p>watch later</p>
              </div>
            )}
            <div className="VerticalCard__icon">
              <i className="fas fa-plus"></i>
              <p>playlist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="VerticalCard__durationWrapper">
        <span className="VerticalCard__duration">{duration}</span>
      </div>
    </div>
  )
}

VerticalCard.propTypes = {
  video: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
    creator: propTypes.string,
    img: propTypes.string,
    duration: propTypes.string,
    creatorImg: propTypes.string,
    category: propTypes.string,
    _id: propTypes.string,
  }),
  isLoggedIn: propTypes.bool,
}

export { VerticalCard }
