import { applyMiddleware, createStore, combineReducers } from 'redux'

import common from './reducers/common'
import auth from './reducers/auth'
import settings from './reducers/settings'
import articleList from './reducers/articleList'
import article from './reducers/article'
import profile from './reducers/profile'
import editor from './reducers/editor'
import { promiseMiddleware, localStorageMiddleware } from './middleware'

const reducer = combineReducers({
    common,
    auth,
    settings,
    articleList,
    article,
    profile,
    editor
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware)

export default store
