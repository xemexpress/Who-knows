export default (state={}, action) => {
    switch(action.type){
        case 'HOME_PAGE_LOADED':
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                currentPage: 0
            }
        case 'HOME_PAGE_UNLOADED':
            return {}
        case 'PROFILE_PAGE_LOADED':
            return {
                ...state,
                articles: action.payload[1].articles,
                articlesCount: action.payload[1].articlesCount,
                currentPage: 0
            }
        case 'PROFILE_PAGE_UNLOADED':
            return {}
        case 'SET_PAGE':
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                currentPage: action.page
            }
        default:
    }

    return state
}