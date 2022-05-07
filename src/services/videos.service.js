import { callApi } from './https.service'

export async function getVideosService() {
  const response = await callApi('/api/videos', {
    method: 'GET',
  })
  return response
}

export async function getVideosByIdService(id) {
  const response = await callApi(`/api/video/${id}`, {
    method: 'GET',
  })
  return response
}
