/* eslint-disable prettier/prettier */
import { Component } from "react";

import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Context from "./context/Context"

import './App.css'

// Replace your code here
class App extends Component{
    state={isDarkTheme:false}

    onChangeTheme=()=>{
        this.setState(prevState=>({isDarkTheme:!prevState.isDarkTheme})
    }


    render(){
        return(
    <Context.Provider value={{
            isDarkTheme,
            onChangeTheme:this.onChangeTheme,
        }}>
     <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/trending/" component={TrendingRoute} />
    <ProtectedRoute exact path="/gaming/" component={GamingRoute} />
    <ProtectedRoute exact path="/saved-videos/" component={SavedVideosRoute} />
    <ProtectedRoute exact path="/videos/:videoId" component={VideoDetailsRoute} />
    </Switch>
    </Context.Provider>
        )}
}
export default App
