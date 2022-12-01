import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

const HomeItem = props => {
  const {details} = props
  const {
    id,
    title,
    thumbnailUrl,
    name,
    profileImageUrl,
    viewCount,
    publishedAt,
  } = details
  const date = new Date(publishedAt)
  const diff = formatDistanceToNow(date)
  return (
    <li>
      <Link to={`videos/${id}`}>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <img src={profileImageUrl} alt="channel logo" />
        <p>{title}</p>
        <p>{name}</p>
        <p>{viewCount} views</p>
        <p>{diff}</p>
      </Link>
    </li>
  )
}

export default HomeItem
