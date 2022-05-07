import React from 'react'
import { useParams } from 'react-router-dom'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  VerticalCard,
  Loader,
} from '../../components'
import { useVideos } from '../../context'
import { getVideosByIdService } from '../../services'
import './styles.scss'

const Video = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [video, setVideo] = React.useState({})
  const scrollRef = React.useRef(null)
  const { myVideos, fetchVideos } = useVideos()
  const { videos, isLoading: suggestionsLoading } = myVideos

  const getVideo = async id => {
    const res = await getVideosByIdService(id)
    setVideo(res.video)
    setIsLoading(false)
  }

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
              <div className="VerticalCard__iconswrapper">
                <div className="VerticalCard__icon">
                  <i className="fas fa-thumbs-up"></i>
                  <p>like</p>
                </div>
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
        </article>
        <aside className="video__suggestion">
          {suggestionsLoading ? (
            <>
              {[...new Array(4)].map((_, index) => (
                <VerticalCard
                  key={index}
                  title="Loading..."
                  creator="loading..."
                />
              ))}
            </>
          ) : (
            videos
              .slice(0, 4)
              .map(video => (
                <VerticalCard
                  creator={video.creator}
                  title={video.title}
                  duration={video.duration}
                  img={video.img}
                  creatorImg={video.creatorImg}
                  category={video.category}
                  id={video._id}
                  description={video.description}
                  key={video._id}
                />
              ))
          )}
          {/* <VerticalCard
            creator="bizan"
            title="Play the life, bizan is the best in the world"
            duration="7min"
          />
          <VerticalCard
            creator="bizan"
            title="Play the life, bizan is the best in the world"
            duration="7min"
          />
          <VerticalCard
            creator="bizan"
            title="Play the life, bizan is the best in the world"
            duration="7min"
          />
          <VerticalCard
            creator="bizan"
            title="Play the life, bizan is the best in the world"
            duration="7min"
          /> */}
        </aside>
      </main>
      <Footer />
    </div>
  )
}

export { Video }
