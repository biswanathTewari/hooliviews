import React from 'react'
import { motion } from 'framer-motion'
import propTypes from 'prop-types'

import { drop } from '../../utils'

const PlaylistCard = ({
  playlist,
  selectedPlaylistId,
  setSelectedPlaylistId,
  onDeletePlaylist,
}) => {
  return (
    <motion.div
      className={`playlist__card ${
        selectedPlaylistId === playlist._id ? 'playlist__card--selected' : ''
      }`}
      variants={drop}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.5, ease: 'easeOut' },
      }}
      onClick={() => setSelectedPlaylistId(playlist._id)}
    >
      <div className="playlist__cardinfo">
        <h1 className="h6">{playlist.title}</h1>
        <h1 className="text-rg">{playlist.videos.length} videos</h1>
      </div>
      <div
        className="playlist__icon"
        onClick={e => onDeletePlaylist(e, playlist._id)}
      >
        <i className="fas fa-trash-alt text-lg"></i>
      </div>
    </motion.div>
  )
}

PlaylistCard.propTypes = {
  playlist: propTypes.object.isRequired,
  selectedPlaylistId: propTypes.string,
  setSelectedPlaylistId: propTypes.func.isRequired,
  onDeletePlaylist: propTypes.func.isRequired,
}

export default PlaylistCard
