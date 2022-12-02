/* eslint-disable prettier/prettier */
import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoDetails from './components/VideoDetails'

import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import Context from './context/Context'

import './App.css'

// Replace your code here
class App extends Component {
  state = {isDarkTheme: false, savedList: []}

  onChangeTheme = () =>
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))

 onSaveVideo = (obj) => {
    const {savedList} = this.state
    if (obj.isSaved) {
        console.log(savedList.includes(obj))
      if (savedList.includes(obj)) {
        const list = savedList.filter(each => each.id !== obj.id)
        console.log(list)
        this.setState({savedList: [...list]})
      }
    } else {
        console.log("add")
      this.setState(prevState => ({savedList: [...prevState.savedList, obj]}))
    }
  }

  render() {
    const {isDarkTheme, savedList} = this.state
    console.log(savedList)
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
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending/" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos/" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:videoId"
            component={VideoDetails}
          />
          <ProtectedRoute path="/not-found" component={NotFound} />
          <Redirect to="not-found" /> />
        </Switch>
      </Context.Provider>
    )
  }
}
export default App
