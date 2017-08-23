import {
    EDITOR_PAGE_LOADED,
    UPDATE_FIELD_EDITOR,
    ARTICLE_SUBMITTED,
    ASYNC_START,
    EDITOR_PAGE_UNLOADED
} from '../constants'

const defaultState = {
    slug: undefined,
    title: '',
    body: ''
}

export default (state = defaultState, action) => {
    switch(action.type){
        case EDITOR_PAGE_LOADED:
            return {
                ...state,
                slug: action.payload.article.slug,
                title: action.payload.article.title,
                body: action.payload.article.body
            }
        case UPDATE_FIELD_EDITOR:
            return {
                ...state,
                [action.key]: action.value
            }
        case ARTICLE_SUBMITTED:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            }
        case ASYNC_START:
            if(action.subtype === 'ARTICLE_SUBMIITED'){
                return {
                    ...state,
                    inProgress: true   
                }
            }
            break
        case EDITOR_PAGE_UNLOADED:
            return defaultState
        default:
    }

    return state
}