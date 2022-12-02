import SideBar from '../SideBar'
import Header from '../Header'
import Context from '../../context/Context'
import {Cont} from '../styledComponents'
import './index.css'

const NotFound = () => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme} = value
      const url = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <Cont isDarkTheme={isDarkTheme}>
          <Header />
          <SideBar />
          <img src={url} alt="not found" />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </Cont>
      )
    }}
  </Context.Consumer>
)

export default NotFound
