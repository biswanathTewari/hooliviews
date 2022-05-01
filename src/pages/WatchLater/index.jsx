import React from 'react'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  HorizontalCard,
} from '../../components'
import './styles.scss'

const WatchLater = () => {
  return (
    <div className="watchlater">
      <Navbar />
      <main className="watchlater__container">
        <Sidebar />
        <MobileNav />
        <article className="watchlater__content">
          <div className="watchlater__info">
            <div className="watchlater__imgwrapper"></div>
            <h1 className="h4">Watch Later</h1>
            <p className="text-rg">12 videos | </p>
          </div>
          <div className="watchlater__list">
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

export { WatchLater }
