import {Link} from 'react-router-dom'

const GamingItem = props => {
  const {details} = props
  const {id, title, thumbnailUrl, viewCount} = details
  return (
    <li>
      <Link to={`/videos/${id}`}>
        <img src={thumbnailUrl} alt="" />
        <p>{title}</p>
        <p>{viewCount} views</p>
      </Link>
    </li>
  )
}

export default GamingItem
