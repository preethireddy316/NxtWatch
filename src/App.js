import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoDetails from './components/VideoDetails'

import ProtectedRoute from './components/ProtectedRoute'

import Context from './context/Context'

import './App.css'

// Replace your code here
class App extends Component {
  state = {isDarkTheme: false, savedList: []}

  onChangeTheme = () =>
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))

  onSaveVideo = (isSaved, id) => {
    const {savedList} = this.state
    if (isSaved) {
      this.setState(prevState => ({savedList: [...prevState.savedList, id]}))
    } else if (savedList.includes(id)) {
      const list = savedList.filter(each => each !== id)
      this.setState({savedList: [...list]})
    }
  }

  render() {
    const {isDarkTheme, savedList} = this.state
    return (
      <Context.Provider
        value={{
          isDarkTheme,
          savedList,
          onChangeTheme: this.onChangeTheme,
          onSaveVideo: this.onSaveVideo,
        }}
      >
        <Switch>
          <Route exact path="/login/" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending/" component={Trending} />
          <ProtectedRoute exact path="/gaming/" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos/" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:videoId"
            component={VideoDetails}
          />
        </Switch>
      </Context.Provider>
    )
  }
}
export default App
