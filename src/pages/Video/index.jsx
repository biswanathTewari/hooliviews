import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  VerticalCard,
  Loader,
} from '../../components'
import { useVideos, useGlobalState, useLikes, useUser } from '../../context'
import { useDocumentTitle } from '../../hooks'
import notFoundGif from '../../assets/lotties/notFound.gif'
import { getVideosByIdService } from '../../services'
import './styles.scss'

const Video = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useGlobalState()
  const {
    myLikes: { likes },
    addLike,
    removeLike,
    isLiked,
  } = useLikes()
  const { isLoggedIn } = useUser()
  const [isLoading, setIsLoading] = React.useState(true)
  const [notFound, setNotFound] = React.useState(false)
  const [liked, setLiked] = React.useState(false)
  const [video, setVideo] = React.useState({})
  const scrollRef = React.useRef(null)
  const { myVideos, fetchVideos } = useVideos()
  const { videos, isLoading: suggestionsLoading } = myVideos
  const setDocTitle = useDocumentTitle('Hooli Views')[1]

  const getVideo = async id => {
    try {
      setNotFound(false)
      const res = await getVideosByIdService(id)
      setVideo(res.video)
      setIsLoading(false)
    } catch (err) {
      setNotFound(true)
      setIsLoading(false)
      showToast({
        message: 'Video not found',
        type: 'failed',
      })
    }
  }

  const likeHandler = () => {
    if (!isLoggedIn) return navigate('/login', { state: { from: location } })
    if (addLike) {
      addLike(video, showToast)
      setLiked(true)
    }
  }

  const unlikeHandler = () => {
    if (removeLike) {
      removeLike(id, showToast)
      setLiked(false)
    }
  }

  React.useEffect(() => {
    if (isLiked(id)) setLiked(true)
    else setLiked(false)
  }, [likes, id])

  React.useEffect(() => {
    if (video.title) setDocTitle(video.title)
  }, [video])

  React.useEffect(() => {
    setIsLoading(true)
    fetchVideos()
    setTimeout(() => {
      getVideo(id)
    }, 600)
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [id])

  return (
    <div className="video" ref={scrollRef}>
      <Navbar />
      <main className="video__wrapper">
        <Sidebar />
        <MobileNav />
        <article className="video__content">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {notFound ? (
                <div className="video__notFound">
                  <img
                    src={notFoundGif}
                    className="video_errimg img-responsive"
                    alt="not found"
                  />
                  <h1 className="h6">
                    {`Hello there you dummy, this video doesn't exist`}
                  </h1>
                  <h1 className="text-lg">
                    Try some of our suggestions instead.
                  </h1>
                </div>
              ) : (
                <>
                  <h1 className="h5">{video.title}</h1>
                  <h1 className="video__creator">
                    {video.creator} | {video.category}
                  </h1>
                  <iframe
                    className="video__player"
                    title="Youtube player"
                    sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                    src={`https://youtube.com/embed/${id}?autoplay=0`}
                  ></iframe>
                  <div
                    className="VerticalCard__iconswrapper"
                    onClick={e => e.stopPropagation()}
                  >
                    {liked ? (
                      <div
                        className="VerticalCard__icon"
                        onClick={unlikeHandler}
                      >
                        <i className="fas fa-thumbs-up"></i>
                        <p>unlike</p>
                      </div>
                    ) : (
                      <div className="VerticalCard__icon" onClick={likeHandler}>
                        <i className="far fa-thumbs-up"></i>
                        <p>like</p>
                      </div>
                    )}
                    <div className="VerticalCard__icon">
                      <i className="fas fa-clock"></i>
                      <p>watch later</p>
                    </div>
                    <div className="VerticalCard__icon">
                      <i className="fas fa-plus"></i>
                      <p>playlist</p>
                    </div>
                  </div>
                  <div className="video__description">
                    <h6 className="h6">Description</h6>
                    <p className="text-rg">{video.description}</p>
                  </div>
                </>
              )}
            </>
          )}
        </article>
        <aside className="video__suggestion">
          {suggestionsLoading ? (
            <>
              {[...new Array(4)].map((_, index) => (
                <VerticalCard
                  key={index}
                  video={{
                    title: 'Loading...',
                    creator: 'Loading...',
                  }}
                />
              ))}
            </>
          ) : (
            videos
              .slice(0, 4)
              .map(video => (
                <VerticalCard
                  video={video}
                  isLoggedIn={isLoggedIn}
                  key={video._id}
                />
              ))
          )}
        </aside>
      </main>
      <Footer />
    </div>
  )
}

export { Video }
