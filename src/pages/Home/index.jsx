import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Navbar } from '../../components'
import CategoryCard from './CategoryCard'
import { useDocumentTitle } from '../../hooks'
import { HeroSvg } from '../../assets/svgs'
import { photoAnim, pageAnimation, fade } from '../../utils'
import './styles.scss'

const Home = () => {
  const navigate = useNavigate()
  useDocumentTitle('Home | Hooli Views')

  return (
    <motion.div
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      className="home"
    >
      <Navbar />
      <main className="home__content padding-default">
        <article className="home__hero">
          <div className="hero__text padding-default">
            <motion.h1 className="h4" variants={fade}>
              {' '}
              experince life like never before through{' '}
            </motion.h1>
            <motion.h1 className="h3" variants={fade}>
              hooli views.
            </motion.h1>
          </div>
          <motion.img
            src={HeroSvg}
            className="hero__image img-responsive"
            alt="boy skatting"
            variants={photoAnim}
          />
        </article>
        <article className="home__categories">
          <CategoryCard
            text="Life is either a daring adventure or nothing at all. "
            type="life"
            onClick={() => navigate('/explore')}
          />
          <CategoryCard
            text="tech is another name for hooli"
            type="tech"
            onClick={() => navigate('/explore')}
          />
          <CategoryCard
            text="Noodles are everybody's happy food"
            type="noodles"
            onClick={() => navigate('/explore')}
          />
        </article>
      </main>
    </motion.div>
  )
}

export { Home }
