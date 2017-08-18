const defaultState = {
    appName: 'Who knows',
    token: null
}

export default (state = defaultState, action) => {
    switch(action.type){
        case 'APP_LOAD':
            return {
                ...state,
                appLoaded: true,
                token: action.token || null,
                currentUser: action.payload ? action.payload.user : null
            }
        case 'REDIRECT':
            return {
                ...state,
                redirectTo: null
            }
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user
            }
        case 'LOGOUT':
            return {
                ...state,
                redirectTo: '/',
                token: null,
                currentUser: null
            }
        case 'SETTINGS_SAVED':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? state.currentUser : action.payload.user
            }
        case 'ARTICLE_SUBMITTED':
            if(action.error){
                return state
            }
            let redirectUrl = `article/${action.payload.article.slug}`
            return {
                ...state,
                redirectTo: redirectUrl
            }
        case 'DELETE_ARTICLE':
            return {
                ...state,
                redirectTo: '/'
            }
        default:
    }
    return state
}