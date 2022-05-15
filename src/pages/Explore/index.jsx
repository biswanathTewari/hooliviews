import React from 'react'

import {
  Navbar,
  Sidebar,
  MobileNav,
  VerticalCard,
  Footer,
  PlaylistModal,
} from '../../components'
import { useDocumentTitle, usePlaylistModal } from '../../hooks'
import { useVideos, useUser } from '../../context'
import './styles.scss'

const Explore = () => {
  const { isLoggedIn } = useUser()
  const { myVideos, fetchVideos } = useVideos()
  const { videos, isLoading } = myVideos
  const {
    showPlaylistModal,
    selectedVideo,
    openPlaylistModal,
    closePlaylistModal,
  } = usePlaylistModal()
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
                    video={{ title: '', category: '' }}
                  />
                ))}
              </>
            ) : (
              videos.map(video => (
                <VerticalCard
                  video={video}
                  key={video._id}
                  isLoggedIn={isLoggedIn}
                  openPlaylistModal={openPlaylistModal}
                />
              ))
            )}
          </div>
        </article>
      </main>
      <Footer />
      <PlaylistModal
        visible={showPlaylistModal}
        onClose={closePlaylistModal}
        selectedVideo={selectedVideo}
      />
    </div>
  )
}

export { Explore }
