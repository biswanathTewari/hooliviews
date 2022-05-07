import React from 'react'

import {
  Navbar,
  Sidebar,
  MobileNav,
  VerticalCard,
  Footer,
} from '../../components'
import { useDocumentTitle } from '../../hooks'
import { useVideos } from '../../context'
import './styles.scss'

const Explore = () => {
  const { myVideos, fetchVideos } = useVideos()
  const { videos, isLoading } = myVideos
  useDocumentTitle('Explore | Hooli Views')

  React.useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div className="explore">
      <Navbar hasSearch={true} />
      <main className="explore__container">
        <Sidebar />
        <MobileNav />
        <article className="explore__content">
          <h1 className="h6">Explore</h1>
          <div className="explore__videos">
            {isLoading ? (
              <>
                {[...new Array(10)].map((_, index) => (
                  <VerticalCard
                    key={index}
                    title="Loading..."
                    creator="loading..."
                  />
                ))}
              </>
            ) : (
              videos.map(video => (
                <VerticalCard
                  creator={video.creator}
                  title={video.title}
                  duration={video.duration}
                  img={video.img}
                  creatorImg={video.creatorImg}
                  category={video.category}
                  id={video._id}
                  description={video.description}
                  key={video._id}
                />
              ))
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export { Explore }
