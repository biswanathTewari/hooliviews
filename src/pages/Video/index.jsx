import React from 'react'
import { useParams } from 'react-router-dom'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  VerticalCard,
} from '../../components'
import './styles.scss'

const Video = () => {
  const { id } = useParams()
  return (
    <div className="video">
      <Navbar />
      <main className="video__wrapper">
        <Sidebar />
        <MobileNav />
        <article className="video__content">
          <h1 className="h5">Dr.Strange and multiverse of madness</h1>
          <h1 className="video__creator">Bizan | life</h1>
          <iframe
            className="video__player"
            title="Youtube player"
            sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
            src={`https://youtube.com/embed/${id}?autoplay=0`}
          ></iframe>
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
          <div className="video__description">
            <h6 className="h6">Description</h6>
            <p className="text-rg">
              Bizan is the best in the world, what are you judging huh? as if
              you are the best
            </p>
          </div>
        </article>
        <aside className="video__suggestion">
          <VerticalCard
            creator="bizan"
            title="Play the life, bizan is the best in the world"
            duration="7min"
          />
          <VerticalCard
            creator="bizan"
            title="Play the life, bizan is the best in the world"
            duration="7min"
          />
          <VerticalCard
            creator="bizan"
            title="Play the life, bizan is the best in the world"
            duration="7min"
          />
          <VerticalCard
            creator="bizan"
            title="Play the life, bizan is the best in the world"
            duration="7min"
          />
        </aside>
      </main>
      <Footer />
    </div>
  )
}

export { Video }
