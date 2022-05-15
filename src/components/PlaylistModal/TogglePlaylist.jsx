import React from 'react'
import propTypes from 'prop-types'

import { usePlaylist, useGlobalState } from '../../context'
import './styles.scss'

const TogglePlaylist = ({ playlist, selectedVideo }) => {
  const { showToast } = useGlobalState()
  const { title, _id: playlistId } = playlist
  const { addToPlaylist, removeFromPlaylist, videoExistsInPlaylist } =
    usePlaylist()
  const [containsVideo, setContainsVideo] = React.useState(false)

  const toggle = () => {
    if (containsVideo) {
      removeFromPlaylist(playlistId, selectedVideo._id, showToast)
    } else {
      addToPlaylist(playlistId, selectedVideo, showToast)
    }
    setContainsVideo(p => !p)
  }

  React.useEffect(() => {
    setContainsVideo(videoExistsInPlaylist(playlist, selectedVideo._id))
  }, [])

  return (
    <div className="playlist__item" onClick={toggle}>
      <div className="playlist__item--toggle">
        <input
          type="checkbox"
          checked={containsVideo ? true : false}
          onChange={() => {}}
        />
        <span className="checkmark"></span>
      </div>

      <label className="playlist__item--label text-rg">{title}</label>
    </div>
  )
}

TogglePlaylist.propTypes = {
  playlist: propTypes.object.isRequired,
  selectedVideo: propTypes.object.isRequired,
}

export default TogglePlaylist
