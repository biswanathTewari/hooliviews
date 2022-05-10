import React from 'react'
import Lottie from 'react-lottie'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  HorizontalCard,
} from '../../components'
import { useWatchLater, useGlobalState } from '../../context'
import { useDocumentTitle } from '../../hooks'
import animation from '../../assets/lotties/empty.json'
import './styles.scss'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animation,
}

const WatchLater = () => {
  const { showToast } = useGlobalState()
  const { myWatchLater, fetchWatchLater } = useWatchLater()
  const { isLoading, WatchLater: list } = myWatchLater
  useDocumentTitle('Watch Later | Hooli Views')

  React.useEffect(() => {
    fetchWatchLater(showToast)
  }, [])
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
            <p className="text-rg">{list.length} videos | </p>
          </div>
          <div className="watchlater__list">
            {isLoading ? (
              <>
                {[...new Array(10)].map((_, index) => (
                  <HorizontalCard
                    key={index}
                    video={{ title: '', category: '' }}
                  />
                ))}
              </>
            ) : (
              <>
                {list.length > 0 ? (
                  list.map(video => (
                    <HorizontalCard video={video} key={video._id} />
                  ))
                ) : (
                  <div className="watchlater__empty">
                    <Lottie options={defaultOptions} height="30rem" speed={1} />
                    <p className="text-rg">Nothing to see here :P</p>
                  </div>
                )}
              </>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export { WatchLater }
