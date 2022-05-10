import React from 'react'
import Lottie from 'react-lottie'

import {
  Navbar,
  Footer,
  Sidebar,
  MobileNav,
  HorizontalCard,
} from '../../components'
import { useHistory, useGlobalState } from '../../context'
import { useDocumentTitle } from '../../hooks'
import animation from '../../assets/lotties/empty.json'
import './styles.scss'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animation,
}

const History = () => {
  const { showToast } = useGlobalState()
  const { myHistory, fetchHistory, clearHistory, removeFromHistory } =
    useHistory()
  const { isLoading, history } = myHistory
  useDocumentTitle('History | Hooli Views')

  React.useEffect(() => {
    fetchHistory(showToast)
  }, [])

  return (
    <div className="history">
      <Navbar />
      <main className="history__container">
        <Sidebar />
        <MobileNav />
        <article className="history__content">
          <div className="history__info">
            <div className="history__imgwrapper"></div>
            <h1 className="h4">History</h1>
            <p className="text-rg">{history.length} videos</p>
            <div
              className="btn btn-transparent"
              onClick={() => clearHistory(showToast)}
            >
              Reset <i className={`fas fa-history`}></i>
            </div>
          </div>
          <div className="history__list">
            {isLoading ? (
              <>
                {[...new Array(10)].map((_, index) => (
                  <HorizontalCard
                    key={index}
                    video={{ title: '', category: '' }}
                  />
                ))}
              </>
            ) : (
              <>
                {history.length > 0 ? (
                  history.map(video => (
                    <React.Fragment key={video._id}>
                      {video._id && (
                        <HorizontalCard
                          video={video}
                          deleteHistory={true}
                          onDeleteHistory={() =>
                            removeFromHistory(video._id, showToast)
                          }
                        />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <div className="history__empty">
                    <Lottie options={defaultOptions} height="30rem" speed={1} />
                    <p className="text-rg">Nothing to see here :P</p>
                  </div>
                )}
              </>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export { History }
