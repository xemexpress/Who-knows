import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'

const mapDispatchToProps = dispatch =>({
    onDel: payload => dispatch({
        type: 'DELETE_ARTICLE',
        payload
    })
})

const ArticleActions = props => {
    const del = () => {
        props.onDel(agent.Articles.del(props.slug))
    }
    if(props.canModify){
        return (
            <span>
                <Link
                    to={`/editor/${props.slug}`}
                    className='btn btn-outline-secondary btn-sm'>
                    <i className='ion-edit'></i> Edit Article
                </Link>
                &nbsp;&nbsp;&nbsp;
                <button className='btn btn-outline-danger btn-sm' onClick={del}>
                    <i className='ion-trash-a'></i> Delete Article
                </button>
            </span>
        )
    }
    
    return null
}

export default connect(()=>({}), mapDispatchToProps)(ArticleActions)