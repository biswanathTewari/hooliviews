import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const CategoryCard = ({ text, type, onClick }) => {
  return (
    <div className={`category category--${type}`} onClick={onClick}>
      <div className="category__blur">
        <div className="category__text">{text.split(' ')[0]}</div>
        <div className="category__description">{text}</div>
      </div>
    </div>
  )
}

CategoryCard.propTypes = {
  text: PropTypes.string,
  img: PropTypes.any,
  type: PropTypes.string,
  onClick: PropTypes.func,
  category: PropTypes.string,
}

export default CategoryCard
