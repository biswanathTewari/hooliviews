import React from 'react'
import Lottie from 'react-lottie'
import { motion } from 'framer-motion'

import PlaylistCard from './PlaylistCard'
import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  HorizontalCard,
} from '../../components'
import { useDocumentTitle } from '../../hooks'
import { fadingParent, sliderHolder } from '../../utils'
import animation from '../../assets/lotties/empty.json'
import selectAnimation from '../../assets/lotties/select.json'
import eyesAnimation from '../../assets/lotties/eyes.json'
import { usePlaylist, useGlobalState } from '../../context'
import './styles.scss'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animation,
}

const selectionAnimOptions = {
  loop: true,
  autoplay: true,
  animationData: selectAnimation,
}

const eyesAnimOptions = {
  loop: true,
  autoplay: true,
  animationData: eyesAnimation,
}

const Playlist = () => {
  const { showToast } = useGlobalState()
  const {
    myPlaylists,
    getPlaylists,
    deletePlaylist,
    getSelectedVideo,
    removeFromPlaylist,
  } = usePlaylist()
  const { playlists } = myPlaylists
  const [selectedPlaylistId, setSelectedPlaylistId] = React.useState('0')
  const [selectedPlaylist, setSelectedPlaylist] = React.useState(null)
  useDocumentTitle('Playlist | Hooli Views')

  const onDeletePlaylist = (e, id) => {
    e.stopPropagation()
    deletePlaylist(id, showToast)
  }

  React.useEffect(() => {
    if (playlists?.length)
      setSelectedPlaylist(getSelectedVideo(selectedPlaylistId))
  }, [playlists, selectedPlaylistId])

  React.useEffect(() => {
    if (playlists.length > 0 && selectedPlaylistId === '0') {
      setSelectedPlaylistId(playlists[0]._id)
    }
  }, [playlists])

  React.useEffect(() => {
    getPlaylists()
  }, [])

  return (
    <motion.div
      className="playlist"
      variants={fadingParent}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Navbar />
      <main className="playlist__container">
        <Sidebar />
        <MobileNav />
        <article className="playlist__content">
          <div className="playlist__info">
            <div className="playlist__imgwrapper"></div>
            <h1 className="h4">Playlists</h1>
            <p className="text-rg">{playlists.length} playlists | </p>
            <motion.div
              className="playlist__lists"
              variants={sliderHolder}
              initial="hidden"
              animate="show"
              exit="exit"
              layout
            >
              {playlists.map(playlist => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  selectedPlaylistId={selectedPlaylistId}
                  setSelectedPlaylistId={setSelectedPlaylistId}
                  onDeletePlaylist={onDeletePlaylist}
                />
              ))}
            </motion.div>
          </div>
          <motion.div
            className="playlist__list"
            variants={sliderHolder}
            initial="hidden"
            animate="show"
            exit="exit"
            layout
          >
            {selectedPlaylist ? (
              <>
                {selectedPlaylist.videos?.length > 0 ? (
                  selectedPlaylist.videos.map(video => (
                    <HorizontalCard
                      video={video}
                      key={video._id}
                      shouldDelete={true}
                      onDelete={() =>
                        removeFromPlaylist(
                          selectedPlaylistId,
                          video._id,
                          showToast,
                        )
                      }
                    />
                  ))
                ) : (
                  <div className="playlist__empty">
                    <Lottie options={defaultOptions} height="30rem" speed={1} />
                    <p className="text-rg">This playlist is empty</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {playlists.length === 0 ? (
                  <div className="playlist__empty my-2">
                    <Lottie
                      options={eyesAnimOptions}
                      height="15rem"
                      speed={1}
                    />
                    <p className="text-rg">No playlists found</p>
                  </div>
                ) : (
                  <div className="playlist__empty">
                    <Lottie
                      options={selectionAnimOptions}
                      height="20rem"
                      speed={1}
                    />
                    <p className="text-rg">Select a playlist</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </article>
      </main>
      <Footer />
    </motion.div>
  )
}

export { Playlist }
