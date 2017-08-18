import React from 'react'
import { connect } from 'react-redux'

import ArticleList from './ArticleList'
import agent from '../agent'

const mapStateToProps = state => ({
    ...state.articleList,
    profile: state.profile
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({
        type: 'PROFILE_PAGE_LOADED',
        payload
    }),
    onSetPage: (p, payload) => dispatch({
        type: 'SET_PAGE',
        page: p,
        payload
    }),
    onUnload: () => dispatch({
        type: 'PROFILE_PAGE_UNLOADED'
    })
})

class Profile extends React.Component {
    constructor(props){
        super(props)

        this.onSetPage = p => this.props.onSetPage(
            p,
            agent.Articles.postedBy(this.props.profile.username)
        )
    }

    componentWillMount(){
        this.props.onLoad(Promise.all([
            agent.Profile.get(this.props.params.username),
            agent.Articles.postedBy(this.props.params.username)
        ]))
    }

    componentWillUnmount(){
        this.props.onUnload()
    }

    render(){
        const profile = this.props.profile
        if(!profile){
            return null
        }

        return (
            <div className='profile-page'>
                <div className='user-info'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-md-10 offset-md-1'>
                                <img className='user-img' src={profile.image} alt={profile.username} />
                                <h4>{profile.username}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-md-10 offset-md-1'>
                            <ArticleList
                                articles={this.props.articles}
                                articlesCount={this.props.articlesCount}
                                currentPage={this.props.currentPage}
                                onSetPage={this.onSetPage} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)