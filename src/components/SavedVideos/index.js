import {HiFire} from 'react-icons/hi'
import SideBar from '../SideBar'
import Header from '../Header'
import HomeItem from '../HomeItem'
import Context from '../../context/Context'
import {Cont} from '../styledComponents'

const SavedVideos = () => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme, savedList} = value

      const renderSuccessView = () => (
        <div>
          {savedList.length === 0 ? (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />
              <h1>No saved videos found</h1>
              <p>You can save your videos by clicking a button</p>
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
        </div>
      )

      return (
        <Cont isDarkTheme={isDarkTheme}>
          <Header />
          <SideBar />

          {renderSuccessView()}
        </Cont>
      )
    }}
  </Context.Consumer>
)

export default SavedVideos
