/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {formatDistanceToNow} from 'date-fns'

import ReactPlayer from 'react-player'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import SideBar from '../SideBar'

import Context from '../../context/Context'

import "./index.css"

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
    const {videoId} = params
    const url = `https://apis.ccbp.in/videos/${videoId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      // success view
      const obj = this.convert(data.video_details)
      this.setState({
        videoDetailObj: {...obj,isSaved:false,isLiked:false,isDisliked:false},
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

 saveVideo = () =>{
    this.setState(prevState =>
                ({videoDetailObj:{...prevState.videoDetailObj,isSaved:!prevState.videoDetailObj.isSaved}}))
            }

onClickLike=()=>{
    const {videoDetailObj}=this.state 
    const {isLiked,isDisliked}=videoDetailObj

   
if(isDisliked===true&&isLiked===false){
     this.setState(prevState =>
                ({videoDetailObj:{...prevState.videoDetailObj,isLiked:!prevState.videoDetailObj.isLiked,isDisliked:!prevState.videoDetailObj.isDisliked}}))
     }
                else{
  this.setState(prevState =>
                ({videoDetailObj:{...prevState.videoDetailObj,isLiked:!prevState.videoDetailObj.isLiked}}))
}           
        }


onClickDislike=()=>{
       const {videoDetailObj}=this.state 
    const {isLiked,isDisliked}=videoDetailObj
if(isLiked===true&&isDisliked===false){
     this.setState(prevState =>
                ({videoDetailObj:{...prevState.videoDetailObj,isLiked:!prevState.videoDetailObj.isLiked,isDisliked:!prevState.videoDetailObj.isDisliked}}))          
}
else{
this.setState(prevState =>
                ({videoDetailObj:{...prevState.videoDetailObj,isDisliked:!prevState.videoDetailObj.isDisliked}}))

}
}

  renderSuccessView = () => {
        const {videoDetailObj} = this.state
        console.log(videoDetailObj)

        const {
          videoUrl,
          title,
          viewCount,
          name,
          subscriberCount,
          description,
          publishedAt,isSaved,isLiked,isDisliked,profileImageUrl
        } = videoDetailObj
        const date = new Date(publishedAt)
        const diff = formatDistanceToNow(date)
        const cls1= isLiked?"clslike":"c"
        const cls2= isDisliked?"clslike":"c"
        const cls3= isSaved?"clslike":"c"

        return (
          <>
            <ReactPlayer url={videoUrl} />
            <img src={profileImageUrl} alt="channel logo"/>
            <p>{title}</p>
            <p>{viewCount} views</p>
            <p>{diff}</p>
            <br />
            <button type="button" onClick={this.onClickLike} className={cls1}>Like</button>
            <button type="button" onClick={this.onClickDislike} className={cls2} >Dislike</button>
            <button type="button" onClick={this.saveVideo} className={cls3}>
              {isSaved?"Saved":"Save"}
            </button>
            <br />
            <p>{name}</p>
            <p>{subscriberCount} Subscribers</p>
            <p>{description}</p>
          </>
        )
        }

    retry = () => {
    this.getVideo()
  }

  renderFailureView = () => (
      <Context.Consumer>
          {value=>{
          const {isDarkTheme} = value
          const url = isDarkTheme?"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png";
          return(
   <div className="products-error-view-container">
      <img
        src={url}
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  


                   )         }}
      </Context.Consumer>
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

  render(){
      return(
      <Context.Consumer>
    {value =>{
        const {isDarkTheme,onSaveVideo}=value
        const {videoDetailObj}=this.state
        const bgcls = isDarkTheme?"bg":""
        onSaveVideo(videoDetailObj)
           return (
      <div className={bgcls}>
        <Header />
        <SideBar />
        {this.renderAllProducts()}
      </div>
    )
    }}
      </Context.Consumer>)
 
  }
}

export default VideoDetails
