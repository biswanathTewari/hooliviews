import { callApi } from './https.service'
import { signUpService, loginService } from './auth.service'
import { getVideosService, getVideosByIdService } from './videos.service'
import {
  getLikedVideoServices,
  likeVideoService,
  removeLikeService,
} from './likes.service'
import {
  getWatchLaterVideoServices,
  watchLaterVideoService,
  removeWatchLaterService,
} from './watchlater.service'
import {
  getHistoryService,
  addToHistoryService,
  removeFromHistoryService,
  clearHistoryService,
} from './history.service'
import {
  getPlaylistsService,
  getPlaylistService,
  addToPlaylistService,
  removeFromPlaylistService,
  createPlaylistService,
  deletePlaylistService,
} from './playlist.service'

export {
  callApi,
  signUpService,
  loginService,
  getVideosService,
  getVideosByIdService,
  getLikedVideoServices,
  likeVideoService,
  removeLikeService,
  getWatchLaterVideoServices,
  watchLaterVideoService,
  removeWatchLaterService,
  getHistoryService,
  addToHistoryService,
  removeFromHistoryService,
  clearHistoryService,
  getPlaylistsService,
  getPlaylistService,
  addToPlaylistService,
  removeFromPlaylistService,
  createPlaylistService,
  deletePlaylistService,
}
