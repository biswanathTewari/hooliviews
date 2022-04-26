import React from 'react'
import propTypes from 'prop-types'

import './styles.scss'

const VerticalCard = ({
  title,
  //description,
  creator,
  img = 'https://images.pexels.com/photos/7737885/pexels-photo-7737885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  duration,
  creatorImg,
}) => {
  const shortTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title
  return (
    <div className="VerticalCard">
      <div className="VerticalCard__imgwrapper">
        <img
          src={img}
          alt="video preview"
          className="VerticalCard__img img-responsive"
        />
      </div>

      <div className="VerticalCard__info">
        <div className="VerticalCard__description">
          <h3 className="text-rg">{creator}</h3>
          <div className="VerticalCard__creator">
            <div className="VerticalCard__avatarwrapper">
              <img
                src={creatorImg}
                alt=""
                className="avatar avatar-large img-responsive"
              />
            </div>
          </div>
        </div>
        <h1 className="VerticalCard__title">{shortTitle}</h1>
        <div className="flex-wrap">
          <p className="VerticalCard__views">53K views</p>
          <div className="VerticalCard__iconswrapper">
            <div className="VerticalCard__icon">
              <i className="fas fa-thumbs-up"></i>
              <p>like</p>
            </div>
            <div className="VerticalCard__icon">
              <i className="fas fa-clock"></i>
              <p>watch later</p>
            </div>
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
  title: propTypes.string,
  description: propTypes.string,
  creator: propTypes.string,
  img: propTypes.string,
  duration: propTypes.string,
  creatorImg: propTypes.string,
}

export { VerticalCard }
