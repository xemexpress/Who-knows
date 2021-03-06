import {
    APP_NAME,
    APP_LOAD,
    REDIRECT,
    LOGIN,
    REGISTER,
    LOGOUT,
    SETTINGS_SAVED,
    ARTICLE_SUBMITTED,
    DELETE_ARTICLE
} from '../constants'

const defaultState = {
    appName: APP_NAME,
    token: null
}

export default (state = defaultState, action) => {
    switch(action.type){
        case APP_LOAD:
            return {
                ...state,
                appLoaded: true,
                token: action.token ? action.error ? null : action.payload.user.token : null,
                currentUser: action.payload ? action.error ? null : action.payload.user : null
            }
        case REDIRECT:
            return {
                ...state,
                redirectTo: null
            }
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user
            }
        case LOGOUT:
            return {
                ...state,
                redirectTo: '/',
                token: null,
                currentUser: null
            }
        case SETTINGS_SAVED:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? state.currentUser : action.payload.user
            }
        case ARTICLE_SUBMITTED:
            if(action.error){
                return state
            }
            let redirectUrl = `article/${action.payload.article.slug}`
            return {
                ...state,
                redirectTo: redirectUrl
            }
        case DELETE_ARTICLE:
            return {
                ...state,
                redirectTo: '/'
            }
        default:
    }
    return state
}