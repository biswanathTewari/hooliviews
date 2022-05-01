import React from 'react'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  HorizontalCard,
} from '../../components'
import './styles.scss'

const History = () => {
  return (
    <div className="history">
      <Navbar />
      <main className="history__container">
        <Sidebar />
        <MobileNav />
        <article className="history__content">
          <div className="history__info">
            <div className="history__imgwrapper"></div>
            <h1 className="h4">History</h1>
            <p className="text-rg">12 videos | </p>
            <div className="btn btn-transparent">
              Reset <i className={`fas fa-history`}></i>
            </div>
          </div>
          <div className="history__list">
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

export { History }
