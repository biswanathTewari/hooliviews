import React from 'react'
import Lottie from 'react-lottie'
import { useNavigate } from 'react-router-dom'

import animation from '../../assets/lotties/coming-soon.json'
import './styles.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
}

const ComingSoon = () => {
  const navigate = useNavigate()
  return (
    <div className="comingsoon">
      <Lottie options={defaultOptions} height="50%" speed={1} />
      <div className="btn btn-primary my-2" onClick={() => navigate('/')}>
        Home
      </div>
    </div>
  )
}

export { ComingSoon }
