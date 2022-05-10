import React from 'react'
import { useNavigate } from 'react-router-dom'
import propTypes from 'prop-types'

import { useGlobalState, useLikes, useWatchLater } from '../../../context'
import './styles.scss'

const HorizontalCard = ({ video }) => {
  const navigate = useNavigate()
  const { showToast } = useGlobalState()
  const {
    title = 'Loading...',
    creator = 'loading...',
    img,
    duration,
    description = '',
    category,
    _id: id,
  } = video
  const {
    myLikes: { likes },
    addLike,
    removeLike,
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
  const shortDescription =
    description.length > 20 ? `${description.substring(0, 25)}...` : description

  const navigationHandler = e => {
    if (e.target.classList.contains('VerticalCard__icon')) return
    navigate(`/watch/${id}`)
  }

  React.useEffect(() => {
    if (likes?.includes(video)) {
      setLiked(true)
    }
    if (isSavedForLater(id)) setSavedForLater(true)
    else setSavedForLater(false)
  }, [likes, WatchLater])

  return (
    <div className="HorizontalCard" onClick={navigationHandler}>
      <div className="HorizontalCard__imgwrapper">
        {img && (
          <img
            src={img}
            alt="video preview"
            className="HorizontalCard__img img-responsive"
          />
        )}
      </div>

      <div className="HorizontalCard__info">
        <h3 className="text-rg">{creator ? creator : 'loading...'}</h3>
        <h1 className="HorizontalCard__title">
          {shortTitle ? shortTitle : 'Loading...'}
        </h1>
        <h1 className="HorizontalCard__description">{shortDescription}</h1>
        <div className="flex-wrap">
          <p className="HorizontalCard__views">53K views | {category}</p>
          <div
            className="HorizontalCard__iconswrapper"
            onClick={e => e.stopPropagation()}
          >
            {liked ? (
              <div
                className="HorizontalCard__icon"
                onClick={() => removeLike(id, showToast, setLiked)}
              >
                <i className="fas fa-thumbs-up"></i>
                <p>unlike</p>
              </div>
            ) : (
              <div
                className="HorizontalCard__icon"
                onClick={() => addLike(video, showToast, setLiked)}
              >
                <i className="far fa-thumbs-up"></i>
                <p>like</p>
              </div>
            )}

            {savedForLater ? (
              <div
                className="HorizontalCard__icon"
                onClick={() =>
                  removeFromWatchLater(id, showToast, setSavedForLater)
                }
              >
                <i className="fas fa-clock"></i>
                <p>watch later</p>
              </div>
            ) : (
              <div
                className="HorizontalCard__icon"
                onClick={() =>
                  addToWatchLater(video, showToast, setSavedForLater)
                }
              >
                <i className="far fa-clock"></i>
                <p>watch later</p>
              </div>
            )}

            <div className="HorizontalCard__icon">
              <i className="fas fa-plus"></i>
              <p>playlist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="HorizontalCard__durationWrapper">
        <span className="HorizontalCard__duration">{duration}</span>
      </div>
    </div>
  )
}

HorizontalCard.propTypes = {
  video: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
    creator: propTypes.string,
    img: propTypes.string,
    duration: propTypes.string,
    category: propTypes.string,
    _id: propTypes.string,
  }),
}

export { HorizontalCard }
