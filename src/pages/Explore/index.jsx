import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

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

const Chip = ({ label, setSearchParams, category }) => {
  const onClick = () => {
    setSearchParams({ category: label })
  }
  return (
    <div
      className={`explore__chip  ${
        label === category ? 'explore__chip--active' : ''
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

const Explore = () => {
  const { isLoggedIn } = useUser()
  const { myVideos, fetchVideos, searchParams, setSearchParams, filterVideos } =
    useVideos()
  const { videos, isLoading, searchTerm } = myVideos
  const {
    showPlaylistModal,
    selectedVideo,
    openPlaylistModal,
    closePlaylistModal,
  } = usePlaylistModal()
  useDocumentTitle('Explore | Hooli Views')
  const category = searchParams.get('category') || 'All'

  const filteredVideos = React.useMemo(
    () => filterVideos(videos, category, searchTerm),
    [category, searchTerm, videos],
  )

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
          <div className="explore__chips">
            <Chip
              label="All"
              setSearchParams={setSearchParams}
              category={category}
            />
            <Chip
              label="Life"
              setSearchParams={setSearchParams}
              category={category}
            />
            <Chip
              label="Tech"
              setSearchParams={setSearchParams}
              category={category}
            />
            <Chip
              label="Food"
              setSearchParams={setSearchParams}
              category={category}
            />
          </div>
          <>
            {isLoading ? (
              <div className="explore__videos">
                {[...new Array(10)].map((_, index) => (
                  <VerticalCard
                    key={index}
                    video={{ title: '', category: '' }}
                  />
                ))}
              </div>
            ) : (
              <motion.div className="explore__videos" layout>
                {filteredVideos.map(video => (
                  <VerticalCard
                    video={video}
                    key={video._id}
                    isLoggedIn={isLoggedIn}
                    openPlaylistModal={openPlaylistModal}
                  />
                ))}
              </motion.div>
            )}
          </>
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

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  category: PropTypes.string,
}

export { Explore }
