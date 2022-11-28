import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

const parse = require('date-fns/parse')

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
  const date = parse(publishedAt, 'MM/dd/yyyy')
  const diff = formatDistanceToNow(date)
  return (
    <li>
      <Link to={`home/${id}`}>
        <img src={thumbnailUrl} alt="" />
        <img src={profileImageUrl} alt="" />
        <p>{title}</p>
        <p>{name}</p>
        <p>{viewCount} views</p>
        <p>{diff}</p>
      </Link>
    </li>
  )
}

export default HomeItem
