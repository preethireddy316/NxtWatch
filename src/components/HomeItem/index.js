import {formatDistanceToNow} from 'date-fns'
var parse = require('date-fns/parse')

const HomeItem = (props)=>{
    const {details}= props
    const {id,title,thumbnailUrl,name,profileImageUrl,viewCount,publishedAt}=details
const date = parse(publishedAt, 'MM/dd/yyyy')
const diff = formatDistanceToNow(date)
    return(
        <li to={`home/${id}`}>
        <img src={thumbnailUrl} alt=""/>
        <img src={profileImageUrl} alt=""/>
        <p>{title}</p>
        <p>{name}</p>
        <p>{viewCount} views</p>
        <p>{diff}</p>
        </li>
    )
}



   id: obj.id,
    title: obj.title,
    thumbnailUrl: obj.thumbnail_url,
    name: obj.channel.name,
    profileImageUrl: obj.channel.profile_image_url,
    viewCount: obj.view_count,
    publishedAt: obj.published_at,