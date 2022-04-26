import React from 'react'

import {
  Navbar,
  Sidebar,
  MobileNav,
  VerticalCard,
  Footer,
} from '../../components'
import './styles.scss'

const Explore = () => {
  return (
    <div className="explore">
      <Navbar hasSearch={true} />
      <main className="explore__container">
        <Sidebar />
        <MobileNav />
        <article className="explore__content">
          <h1 className="h6">Explore</h1>
          <div className="explore__videos">
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
            <VerticalCard
              creator="bizan"
              title="Play the life, bizan is the best in the world"
              duration="7min"
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export { Explore }
