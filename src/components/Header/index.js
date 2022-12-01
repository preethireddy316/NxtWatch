import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Context from '../../context/Context'

const Header = props => (
  <Context.Consumer>
    {value => {
      const {isDarkTheme, onChangeTheme} = value
      const logourl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      const themeUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const changeTheme = () => {
        onChangeTheme()
      }

      return (
        <nav className="nav">
          <ul className="header-list">
            <li>
              <Link to="/">
                <button type="button" data-testid="theme" onClick={changeTheme}>
                  <img src={logourl} alt="website logo" />
                </button>
              </Link>
            </li>
            <li>
              <button type="button" onClick={changeTheme}>
                <img src={themeUrl} alt="theme" />
              </button>
            </li>
            <li>
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      )
    }}
  </Context.Consumer>
)

export default Header
