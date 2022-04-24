import React from 'react'
import propTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

import './styles.scss'

const NavLink = ({ to, text, icon }) => {
  const { pathname } = useLocation()
  const isActive = pathname.includes(to)

  return (
    <li>
      <Link to={to} className="sidebar__navlink">
        <div
          className={`sidebar__navicon ${
            isActive && 'sidebar__navicon--active'
          }`}
        >
          <i className={`fas ${icon}`}></i>
        </div>
        <div
          className={`sidebar__navtext ${
            isActive && 'sidebar__navtext--active'
          }`}
        >
          {text}
        </div>
      </Link>
    </li>
  )
}

const Sidebar = () => {
  return (
    <div className="sidebar">
      <section className="sidebar__section">
        <h1 className="sidebar__title">MENU</h1>
        <ul className="sidebar__navs">
          <NavLink to="/explore" text="Explore" icon="fa-compass" />
          <NavLink to="/something" text="something" icon="fa-compass" />
          <NavLink to="/something" text="something" icon="fa-compass" />
          <NavLink to="/something" text="something" icon="fa-compass" />
        </ul>
        <div className="sidebar__line"></div>
      </section>
      <section className="sidebar__section mt">
        <h1 className="sidebar__title">CATEGORY</h1>
        <ul className="sidebar__navs">
          <NavLink to="/something" text="Live" icon="fa-satellite-dish" />
          <NavLink to="/something" text="Tutorials" icon="fa-arrow-right" />
          <NavLink to="/something" text="Competition" icon="fa-crown" />
          <NavLink to="/something" text="Community" icon="fa-headphones" />
        </ul>
        <div className="sidebar__line"></div>
      </section>
    </div>
  )
}

NavLink.propTypes = {
  to: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
}

export { Sidebar }
