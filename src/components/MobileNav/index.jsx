import React from 'react'
import propTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

import './styles.scss'

const NavLink = ({ to, text, icon }) => {
  const { pathname } = useLocation()
  const isActive = pathname.includes(to)

  return (
    <li>
      <Link to={to} className="mobilenav__navlink">
        <div
          className={`mobilenav__navicon ${
            isActive && 'mobilenav__navicon--active'
          }`}
        >
          <i className={`fas ${icon}`}></i>
        </div>
        <div
          className={`mobilenav__navtext ${
            isActive && 'mobilenav__navtext--active'
          }`}
        >
          {text}
        </div>
      </Link>
    </li>
  )
}

const MobileNav = () => {
  return (
    <div className="mobilenav">
      <ul className="mobilenav__navlinks">
        <NavLink to="/explore" text="Explore" icon="fa-compass" />
        <NavLink to="/something" text="something" icon="fa-compass" />
        <NavLink to="/something" text="something" icon="fa-compass" />
        <NavLink to="/something" text="something" icon="fa-compass" />
      </ul>
    </div>
  )
}

NavLink.propTypes = {
  to: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
}

export { MobileNav }
