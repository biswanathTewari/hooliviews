import React from 'react'
import Lottie from 'react-lottie'
import { motion } from 'framer-motion'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  HorizontalCard,
} from '../../components'
import { useLikes } from '../../context'
import { useDocumentTitle } from '../../hooks'
import animation from '../../assets/lotties/empty.json'
import { fadingParent, sliderHolder } from '../../utils'
import './styles.scss'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animation,
}

const LikedVideos = () => {
  const { myLikes, fetchLikes } = useLikes()
  const { isLoading, likes } = myLikes
  useDocumentTitle('Liked Videos | Hooli Views')

  React.useEffect(() => {
    fetchLikes()
  }, [])

  return (
    <motion.div
      className="likedvideos"
      variants={fadingParent}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Navbar />
      <main className="likedvideos__container">
        <Sidebar />
        <MobileNav />
        <article className="likedvideos__content">
          <div className="likedvideos__info">
            <div className="likedvideos__imgwrapper"></div>
            <h1 className="h4">Liked videos</h1>
            <p className="text-rg">{likes.length} videos | </p>
          </div>
          <>
            {isLoading ? (
              <div>
                {[...new Array(10)].map((_, index) => (
                  <HorizontalCard
                    key={index}
                    video={{ title: '', category: '' }}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="likedvideos__list"
                variants={sliderHolder}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {likes.length > 0 ? (
                  likes.map(video => (
                    <HorizontalCard video={video} key={video._id} />
                  ))
                ) : (
                  <div className="likedvideos__empty">
                    <Lottie options={defaultOptions} height="30rem" speed={1} />
                    <p className="text-rg">Nothing to see here :P</p>
                  </div>
                )}
              </motion.div>
            )}
          </>
        </article>
      </main>
      <Footer />
    </motion.div>
  )
}

export { LikedVideos }
