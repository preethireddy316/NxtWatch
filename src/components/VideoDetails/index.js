import ReactPlayer from 'react-player'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import SideBar from '../SideBar'

import Context from '../../context/Context'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoDetails extends Component {
  state = {
    videoDetailObj: {},
    apiStatus: apiStatusConstants.initial,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideo()
  }

  convert = obj => ({
    id: obj.id,
    title: obj.title,
    videoUrl: obj.video_url,
    thumbnailUrl: obj.thumbnail_url,
    name: obj.channel.name,
    profileImageUrl: obj.channel.profile_image_url,
    subscriberCount: obj.channel.subscriber_count,
    viewCount: obj.view_count,
    publishedAt: obj.published_at,
    description: obj.description,
  })

  getVideo = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(options, url)
    const data = await response.json()
    if (response.ok) {
      // success view
      const obj = this.convert(data.video_details)
      this.setState({
        videoDetailObj: obj,
        apiStatus: apiStatusConstants.success,
      })
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

  renderSuccessView = () => (
    <Context.Consumer>
      {value => {
        const {onSaveVideo} = value
        const {videoDetailObj, isSaved} = this.state
        const {
          videoUrl,
          title,
          viewCount,
          name,
          subscriberCount,
          description,
        } = videoDetailObj

        const saveVideo = () =>
          this.setState(
            {isSaved: !isSaved},
            onSaveVideo(isSaved, videoDetailObj.id),
          )

        return (
          <>
            <ReactPlayer url={videoUrl} />
            <h1>{title}</h1>
            <p>{viewCount}</p>
            <p />
            <button type="button">Like</button>
            <button type="button">Dislike</button>
            <button type="button" onClick={saveVideo}>
              Save
            </button>
            <br />
            <p>{name}</p>
            <p>{subscriberCount} Subscribers</p>
            <p>{description}</p>
          </>
        )
      }}
    </Context.Consumer>
  )

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
    return (
      <>
        <Header />
        <SideBar />
        {this.renderAllProducts()}
      </>
    )
  }
}

export default VideoDetails
