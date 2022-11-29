import {Link} from 'react-router-dom'
import Context from '../../context/Context'

const Header = props => (
  <Context.Consumer>
    {value => {
      const {onChangeTheme} = value
      const onLogout = () => {
        const {history} = props
        history.replace('/login')
      }

      const changeTheme = () => {
        onChangeTheme()
      }

      return (
        <nav className="nav">
          <ul className="header-list">
            <Link to="/">
              <button type="button" onChange={changeTheme}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="logo"
                />
              </button>
            </Link>
            <li>
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </Link>
            </li>
            <li>
              <Link to="/">
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
