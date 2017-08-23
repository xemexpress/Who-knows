import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import ReactGA from 'react-ga'
import registerServiceWorker from './registerServiceWorker'

import App from './components/App'
import Home from './components/Home'
import Intro from './components/Intro'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import Article from './components/Article'
import Profile from './components/Profile'
import Editor from './components/Editor'
import store from './store'

import {
    GA_TRACKING_ID
} from './constants'

ReactGA.initialize(GA_TRACKING_ID)

function fireTracking(){
    ReactGA.set({
        useId: 523,
        page: window.location.hash
    })
    ReactGA.pageview(window.location.hash)
}

ReactDOM.render((
    <Provider store={store}>
        <Router onUpdate={fireTracking} history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
                <Route path='intro' component={Intro} />
                <Route path='login' component={Login} />
                <Route path='register' component={Register} />
                <Route path='settings' component={Settings} />
                <Route path='article/:id' component={Article} />
                <Route path='@:username' component={Profile} />
                <Route path='editor' component={Editor} />
                <Route path='editor/:slug' component={Editor} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
