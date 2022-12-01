import {HiFire} from 'react-icons/hi'
import SideBar from '../SideBar'
import Header from '../Header'
import HomeItem from '../HomeItem'
import Context from '../../context/Context'

const SavedVideos = () => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme, savedList} = value
      const bgcls = isDarkTheme ? 'bg' : ''

      const renderSuccessView = () => (
        <>
          {savedList.length === 0 ? (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />
              <h1>No saved videos found</h1>
              <p>Save your videos by clicking a button</p>
            </>
          ) : (
            <>
              <HiFire />

              <h1>Saved Videos</h1>
              <ul>
                {savedList.map(each => (
                  <HomeItem key={each.id} details={each} />
                ))}
              </ul>
            </>
          )}
        </>
      )

      return (
        <div className={bgcls}>
          <Header />
          <SideBar />

          {renderSuccessView()}
        </div>
      )
    }}
  </Context.Consumer>
)

export default SavedVideos
