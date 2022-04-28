import React from 'react'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  HorizontalCard,
} from '../../components'
import './styles.scss'

const LikedVideos = () => {
  return (
    <div className="likedvideos">
      <Navbar />
      <main className="likedvideos__container">
        <Sidebar />
        <MobileNav />
        <article className="likedvideos__content">
          <div className="likedvideos__info">
            <div className="likedvideos__imgwrapper"></div>
            <h1 className="h4">Liked videos</h1>
            <p className="text-rg">12 videos | </p>
          </div>
          <div className="likedvideos__list">
            <HorizontalCard
              title="bizan is the best"
              category="life"
              creator="bizan"
              description="let me see, bizan is king of the world"
              duration="7mins"
            />
            <HorizontalCard
              title="bizan is the best"
              category="life"
              creator="bizan"
              description="let me see, bizan is king of the world"
              duration="7mins"
            />
            <HorizontalCard
              title="bizan is the best"
              category="life"
              creator="bizan"
              description="let me see, bizan is king of the world"
              duration="7mins"
            />
            <HorizontalCard
              title="bizan is the best"
              category="life"
              creator="bizan"
              description="let me see, bizan is king of the world"
              duration="7mins"
            />
            <HorizontalCard
              title="bizan is the best"
              category="life"
              creator="bizan"
              description="let me see, bizan is king of the world"
              duration="7mins"
            />
            <HorizontalCard
              title="bizan is the king"
              category="life"
              creator="bizan"
              description="let me see, bizan is king of the world"
              duration="7mins"
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export { LikedVideos }
