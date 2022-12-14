import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import SideBar from '../SideBar'
import Header from '../Header'
import HomeItem from '../HomeItem'
import Context from '../../context/Context'
import {Cont, BannerCont} from '../styledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noResults: 'noResult',
}

class Home extends Component {
  state = {
    videosList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  convert = obj => ({
    id: obj.id,
    title: obj.title,
    thumbnailUrl: obj.thumbnail_url,
    name: obj.channel.name,
    profileImageUrl: obj.channel.profile_image_url,
    viewCount: obj.view_count,
    publishedAt: obj.published_at,
  })

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    console.log('get request')
    const data = await response.json()
    if (response.ok) {
      // success view
      const list = data.videos.map(each => this.convert(each))
      this.setState({videosList: list, apiStatus: apiStatusConstants.success})
    } else {
      // failure view
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  retry = () => {
    this.setState({searchInput: ''}, this.getVideos)
  }

  renderNoSearchResults = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  ClickSearch = () => this.getVideos()

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={this.ClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {videosList, searchInput} = this.state
    const filteredList = videosList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const noResults = filteredList.length === 0

    return (
      <>
        {this.renderSearchInput()}
        {noResults ? (
          this.renderNoSearchResults()
        ) : (
          <>
            <ul className="ul">
              {videosList.map(each => (
                <HomeItem key={each.id} details={each} />
              ))}
            </ul>
          </>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderBanner = () => {
    const overlayStyles = {
      position: 'fixed',
      backgroundImage:
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png',
      width: '500px',
      backgroundColor: 'red',
    }

    return (
      <BannerCont data-testid="banner">
        <Popup open modal overlayStyles={overlayStyles}>
          {close => (
            <>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="nxt watch logo"
                />
                <p>Buy Nxt Watch Premium</p>
                <button type="button">GET IT NOW</button>
              </div>
              <button
                type="button"
                data-testid="close"
                className="trigger-button"
                onClick={() => close()}
              >
                <AiOutlineClose />
              </button>
            </>
          )}
        </Popup>
      </BannerCont>
    )
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <Cont data-testid="home" isDarkTheme={isDarkTheme}>
              <Header />
              <SideBar />
              {this.renderBanner()}
              {this.renderAllProducts()}
            </Cont>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
