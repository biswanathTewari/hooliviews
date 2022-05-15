import { callApi } from './https.service'
import propTypes from 'prop-types'

export async function getPlaylistsService() {
  const res = await callApi('/api/user/playlists')
  return res
}

export async function createPlaylistService(playlist) {
  const res = await callApi('/api/user/playlists', {
    method: 'POST',
    body: {
      playlist,
    },
  })
  return res
}

export async function deletePlaylistService(id) {
  const res = await callApi(`/api/user/playlists/${id}`, {
    method: 'DELETE',
  })
  return res
}

export async function getPlaylistService(id) {
  const res = await callApi(`/api/user/playlists/${id}`)
  return res
}

export async function addToPlaylistService(id, video) {
  const res = await callApi(`/api/user/playlists/${id}`, {
    method: 'POST',
    body: {
      video,
    },
  })
  return res
}

export async function removeFromPlaylistService(playlistId, videoId) {
  const res = await callApi(`/api/user/playlists/${playlistId}/${videoId}`, {
    method: 'DELETE',
  })
  return res
}

createPlaylistService.propTypes = {
  playlist: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
  }),
}

deletePlaylistService.propTypes = {
  id: propTypes.string,
}

getPlaylistService.propTypes = {
  id: propTypes.string,
}

addToPlaylistService.propTypes = {
  id: propTypes.string,
  video: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
    creator: propTypes.string,
    img: propTypes.string,
    duration: propTypes.string,
    creatorImg: propTypes.string,
    category: propTypes.string,
    _id: propTypes.string,
  }),
}

removeFromPlaylistService.propTypes = {
  playlistId: propTypes.string,
  videoId: propTypes.string,
}
