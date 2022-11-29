/* eslint-disable no-unused-vars */
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

const SideItem = props => {
  const {details, activeObj, onChangeActive} = props
  const {id, path, name} = details

  const ChangeObj = () => {
    onChangeActive(details)
  }

  const getIcon = () => {
    switch (id) {
      case 1:
        return <AiFillHome />
      case 2:
        return <HiFire />
      case 3:
        return <SiYoutubegaming />
      case 4:
        return <BiListPlus />
      default:
        return null
    }
  }
  return (
    <li>
      <Link to={`/${path}`}>
        <button type="button" onClick={ChangeObj}>
          {getIcon()}
          {name}
        </button>
      </Link>
    </li>
  )
}

export default SideItem
