import React from 'react'
import { connect } from 'react-redux'

import Banner from './Banner'
import MainView from './MainView'
import agent from '../../agent'

const mapStateToProps = state => ({
    appName: state.common.appName
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({
        type: 'HOME_PAGE_LOADED',
        payload
    }),
    onUnload: payload => dispatch({
        type: 'HOME_PAGE_UNLOADED',
        payload
    })
})

class Home extends React.Component {
    componentWillMount(){
        this.props.onLoad(agent.Articles.all())
    }

    componentWillUnmout(){
        this.props.onUnload()
    }

    render(){
        return (
            <div className='home-page'>
                <Banner appName={this.props.appName} />

                <div className='container page'>
                    <div className='row'>
                        <MainView />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)