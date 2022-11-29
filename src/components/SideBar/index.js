import {Component} from 'react'

import SideItem from '../SideItem'

const sideList = [
  {id: 1, path: '', name: 'Home'},
  {id: 2, path: 'trending', name: 'Trending'},
  {id: 3, path: 'gaming', name: 'Gaming'},
  {id: 4, path: 'saved-videos', name: 'Saved Videos'},
]

class SideBar extends Component {
  state = {activeObj: sideList[0]}

  onChangeActive = obj => this.setState({activeObj: obj})

  renderContact = () => (
    <>
      <p>CONTACT US</p>
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
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </>
  )

  render() {
    const {activeObj} = this.state
    return (
      <>
        <ul>
          {sideList.map(each => (
            <SideItem
              key={each.id}
              details={each}
              activeObj={activeObj}
              onChangeActive={this.onChangeActive}
            />
          ))}
          {this.renderContact()}
        </ul>
      </>
    )
  }
}

export default SideBar
