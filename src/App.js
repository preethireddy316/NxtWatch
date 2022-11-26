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


    return(
        <Context.Provider value={{
            isDarkTheme,
            onChangeTheme:this.onChangeTheme,
        }}>

        return(
            <Switch>
    <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={HomeRoute} />

    <ProtectedRoute exact path="/trending/" component={TrendingRoute} />

    <ProtectedRoute exact path="/gaming/" component={GamingRoute} />

    <ProtectedRoute exact path="/saved-videos/" component={SavedVideos} />
    <ProtectedRoute exact path="/videos/:videoId" component={VideoDetails} />


</Switch>)

        
        </Context.Provider>
    )
}
export default App
