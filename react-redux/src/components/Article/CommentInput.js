import React from 'react'
import { connect } from 'react-redux'

import ListErrors from '../ListErrors'
import agent from '../../agent'

const mapDispatchToProps = dispatch => ({
    onSubmit: payload => dispatch({
        type: 'ADD_COMMENT',
        payload
    })
})

class CommentInput extends React.Component {
    constructor(){
        super()
        this.state = {
            body: ''
        }

        this.setBody = ev => {
            this.setState({ body: ev.target.value })
        }

        this.createComment = ev => {
            ev.preventDefault()
            const payload = agent.Comments.create(
                this.props.slug,
                { body: this.state.body }
            )
            this.setState({ body: '' })
            this.props.onSubmit(payload)
        }
    }

    render(){
        return (
            <div>
                <ListErrors errors={this.props.errors} />
                <form className='card comment-form' onSubmit={this.createComment}>
                    <div className='card-block'>
                        <textarea
                            className='form-control'
                            placeholder='Write a comment...'
                            value={this.state.body}
                            onChange={this.setBody}
                            rows='3' />
                    </div>

                    <div className='card-footer'>
                        <img
                            className='comment-author-img'
                            src={this.props.currentUser.image}
                            alt={this.props.currentUser.username} />
                        <button
                            className='btn btn-sm btn-primary'
                            type='submit'>
                            Post Comment
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(()=>({}), mapDispatchToProps)(CommentInput)