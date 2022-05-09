import { callApi } from './https.service'

export async function getLikedVideoServices() {
  const res = await callApi('/api/user/likes')
  return res
}

export async function likeVideoService(video) {
  const res = await callApi(`/api/user/likes`, {
    method: 'POST',
    body: { video },
  })
  return res
}

export async function removeLikeService(videoId) {
  const response = await callApi(`/api/user/likes/${videoId}`, {
    method: 'DELETE',
  })
  return response
}
