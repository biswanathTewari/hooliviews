import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Navbar } from '../../components'
import CategoryCard from './CategoryCard'
import { useDocumentTitle } from '../../hooks'
import { HeroSvg } from '../../assets/svgs'
import './styles.scss'

const Home = () => {
  const navigate = useNavigate()
  useDocumentTitle('Home | Hooli Views')

  return (
    <div className="home">
      <Navbar />
      <main className="home__content padding-default">
        <article className="home__hero">
          <div className="hero__text padding-default">
            <h1 className="h4"> experince life like never before through </h1>
            <h1 className="h3">hooli views.</h1>
          </div>
          <img
            src={HeroSvg}
            className="hero__image img-responsive"
            alt="boy skatting"
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
    </div>
  )
}

export { Home }
