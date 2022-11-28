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
          <img src="" alt="" />
          <ul className="header-list">
            <li to="/">
              <button type="button" onChange={changeTheme}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="logo"
                />
              </button>
            </li>

            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
            </li>
            <li to="/">
              <button type="button" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )
    }}
  </Context.Consumer>
)

export default Header
