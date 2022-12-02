import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import Context from '../../context/Context'
import {Cont} from '../styledComponents'

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
        console.log('1logout')
        history.replace('/login')
        console.log('logout')
      }

      const changeTheme = () => {
        onChangeTheme()
      }

      const overlayStyles = isDarkTheme
        ? {backgroundColor: '#f9f9f9', color: '#181818'}
        : {backgroundColor: '#181818', color: '#f9f9f9'}

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
              <Popup
                className="f"
                modal
                overlayStyles={overlayStyles}
                trigger={<button type="button">Logout</button>}
              >
                {close => (
                  <Cont>
                    <p>Are you sure, you want to logout?</p>

                    <button type="button" onClick={() => close()}>
                      Cancel
                    </button>
                    <button type="button" onClick={onLogout}>
                      Confirm
                    </button>
                  </Cont>
                )}
              </Popup>
            </li>
          </ul>
        </nav>
      )
    }}
  </Context.Consumer>
)

export default Header
