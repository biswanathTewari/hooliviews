import React from 'react'
import propTypes from 'prop-types'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie'

import TogglePlaylist from './TogglePlaylist'
import animation from '../../assets/lotties/btnLoading.json'
import { zoom } from '../../utils'
import { usePlaylist, useGlobalState } from '../../context'
import './styles.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
}

const PlaylistModal = ({ visible, onClose, selectedVideo }) => {
  const { showToast } = useGlobalState()
  const { myPlaylists, getPlaylists, createPlaylist } = usePlaylist()
  const { playlists, isLoading } = myPlaylists
  const [newPlaylist, setNewPlaylist] = React.useState('')

  const submitHandler = async () => {
    if (newPlaylist.length < 3) {
      showToast({
        message: 'Playlist name must be at least 3 characters long.',
        type: 'failed',
      })
      return
    }
    const playlistObj = {
      title: newPlaylist,
      description: '',
    }
    await createPlaylist(playlistObj, showToast)
    setNewPlaylist('')
  }

  React.useEffect(() => {
    getPlaylists()
  }, [])

  if (!visible) return null
  return (
    <motion.div className="playlistmodal" onClick={onClose}>
      <motion.div
        variants={zoom}
        initial="hidden"
        animate="show"
        exit="exit"
        className="playlistmodal__content"
        onClick={e => e.stopPropagation()}
      >
        <div>
          <h1 className="h6">Playlists</h1>
          <div className="playlistmodal__list">
            {playlists &&
              playlists.map((playlist, index) => (
                <TogglePlaylist
                  key={index}
                  playlist={playlist}
                  selectedVideo={selectedVideo}
                />
              ))}
          </div>
        </div>
        <div className="playlistmodal__inputs">
          <input
            className="playlistmodal__input text-rg"
            type="text"
            value={newPlaylist}
            onChange={e => setNewPlaylist(e.target.value)}
            placeholder="Add new playlist"
          />
          <button
            className="playlistmodal__submit text-rg"
            onClick={submitHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <Lottie options={defaultOptions} height="1.5rem" speed={1} />
            ) : (
              'Create'
            )}
          </button>
        </div>
        <i
          className="far fa-times-circle playlistmodal__closebtn"
          onClick={onClose}
        ></i>
      </motion.div>
    </motion.div>
  )
}

PlaylistModal.propTypes = {
  visible: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  selectedVideo: propTypes.object,
}

export { PlaylistModal }
