import React from 'react'
import Lottie from 'react-lottie'
import { useNavigate } from 'react-router-dom'

import animation from '../../assets/lotties/not-found.json'
import './styles.scss'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animation,
}

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="notFound">
      <Lottie options={defaultOptions} height="50%" speed={1.5} />
      <div className="btn btn-primary my-2" onClick={() => navigate('/')}>
        Home
      </div>
    </div>
  )
}

export { NotFound }
