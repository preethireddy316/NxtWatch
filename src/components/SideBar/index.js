/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import Component from 'react'

import SideItem from '../SideItem'

const sideList = [
  {id: 1, icon: <AiFillHome />, path: '', name: 'Home'},
  {id: 2, icon: <HiFire />, path: 'trending', name: 'Trending'},
  {id: 3, icon: <SiYoutubegaming />, path: 'gaming', name: 'Gaming'},
  {id: 4, icon: <BiListPlus />, path: 'saved-videos', name: 'Saved Videos'},
]

class SideBar extends Component {
  state = {activeObj: sideList[0]}

  onChangeActive = obj => this.setState({activeObj: obj})

  renderContact = () => (
    <>
      <h1>CONTACT US</h1>
      <ul>
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
        </li>
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
        </li>
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </li>
      </ul>
      <p>Enjoy</p>
    </>
  )

  render() {
    const {activeObj} = this.state
    return (
      <>
        {sideList.map(each => (
          <SideItem
            key={each.id}
            details={each}
            activeObj={activeObj}
            onChangeActive={this.onChangeActive}
          />
        ))}
        {this.renderContact()}
      </>
    )
  }
}

export default SideBar
