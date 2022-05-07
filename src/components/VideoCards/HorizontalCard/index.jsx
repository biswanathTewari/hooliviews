import React from 'react'
import { useNavigate } from 'react-router-dom'
import propTypes from 'prop-types'

import './styles.scss'

const HorizontalCard = ({
  title,
  description,
  creator,
  img,
  duration,
  //creatorImg,
  category,
  id,
}) => {
  const navigate = useNavigate()
  const shortTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title
  const shortDescription =
    description.length > 20 ? `${description.substring(0, 25)}...` : description

  const navigationHandler = e => {
    if (e.target.classList.contains('fas')) return
    navigate(`/watch/${id}`)
  }
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
          <div className="HorizontalCard__iconswrapper">
            <div className="HorizontalCard__icon">
              <i className="fas fa-thumbs-up"></i>
              <p>like</p>
            </div>
            <div className="HorizontalCard__icon">
              <i className="fas fa-clock"></i>
              <p>watch later</p>
            </div>
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
  title: propTypes.string,
  description: propTypes.string,
  creator: propTypes.string,
  img: propTypes.string,
  duration: propTypes.string,
  creatorImg: propTypes.string,
  category: propTypes.string,
  id: propTypes.string,
}

export { HorizontalCard }
