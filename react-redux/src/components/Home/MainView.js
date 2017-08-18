import React from 'react'
import { connect } from 'react-redux'

import ArticleList from '../ArticleList'
import agent from '../../agent'

const mapStateToProps = state => ({
    ...state.articleList
})

const mapDispatchToProps = dispatch => ({
    onSetPage: p => dispatch({
        type: 'SET_PAGE',
        page: p,
        payload: agent.Articles.all(p)
    })
})

const MainView = props => {
    return (
        <div className='col-xs-12'>
            <ArticleList
                articles={props.articles}
                articlesCount={props.articlesCount}
                currentPage={props.currentPage}
                onSetPage={props.onSetPage} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)