import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import GamingItem from '../HomeItem'

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

    const url = `https://apis.ccbp.in/videos/gaming`
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

  renderSuccessView = () => {
    const {videosList} = this.state
    return (
      <ul>
        {videosList.map(each => (
          <HomeItem key={each.id} details={each} />
        ))}
      </ul>
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
