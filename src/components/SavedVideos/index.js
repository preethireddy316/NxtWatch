import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import HomeItem from '../HomeItem'

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
    savedVideoList: [],
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

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(options, url)
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

  renderLoading = () => {
    ;<div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getVideos)
  }

  retry = () => {
    this.getVideos()
  }

  renderNoSearchResults = () => (
    <div>
      <h1>No Search</h1>
      <p>Try different</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          data-testid="searchButton"
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <BsSearch className="search-icon" />
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
        {noResults ? (
          this.renderNoSearchResults()
        ) : (
          <>
            {this.renderSearchInput()}
            <ul>
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

  render() {
    return <>{this.renderAllProducts()}</>
  }
}

export default Home
