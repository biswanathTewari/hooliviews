import { callApi } from './https.service'

export async function getHistoryService() {
  const res = await callApi('/api/user/history')
  return res
}

export async function addToHistoryService(video) {
  const res = await callApi(`/api/user/history`, {
    method: 'POST',
    body: { video },
  })
  return res
}

export async function removeFromHistoryService(videoId) {
  const response = await callApi(`/api/user/history/${videoId}`, {
    method: 'DELETE',
  })
  return response
}

export async function clearHistoryService() {
  const response = await callApi(`/api/user/history/all`, {
    method: 'DELETE',
  })
  return response
}
