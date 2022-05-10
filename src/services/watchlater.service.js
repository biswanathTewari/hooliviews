import { callApi } from './https.service'

export async function getWatchLaterVideoServices() {
  const res = await callApi('/api/user/watchlater')
  return res
}

export async function watchLaterVideoService(video) {
  const res = await callApi(`/api/user/watchlater`, {
    method: 'POST',
    body: { video },
  })
  return res
}

export async function removeWatchLaterService(videoId) {
  const response = await callApi(`/api/user/watchlater/${videoId}`, {
    method: 'DELETE',
  })
  console.log('response', response)
  return response
}
