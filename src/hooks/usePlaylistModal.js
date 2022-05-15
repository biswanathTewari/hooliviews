import React from 'react'

const usePlaylistModal = () => {
  const [showPlaylistModal, setShowPlaylistModal] = React.useState(false)
  const [selectedVideo, setSelectedVideo] = React.useState(null)

  const openPlaylistModal = video => {
    setShowPlaylistModal(true)
    setSelectedVideo(video)
  }

  const closePlaylistModal = () => {
    setShowPlaylistModal(false)
    setSelectedVideo(null)
  }

  React.useEffect(() => {
    if (showPlaylistModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showPlaylistModal])

  return {
    openPlaylistModal,
    closePlaylistModal,
    showPlaylistModal,
    selectedVideo,
  }
}

export { usePlaylistModal }
