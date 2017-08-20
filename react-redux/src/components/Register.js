import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ListErrors from './ListErrors'
import agent from '../agent'

import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
} from '../constants'

const mapStateToProps = state => ({
    ...state.auth
})

const mapDispatchToProps = dispatch => ({
    onUpdateField: (key, value) => dispatch({
        type: UPDATE_FIELD_AUTH,
        key,
        value
    }),
    onSubmit: (username, password) => dispatch({
        type: REGISTER,
        payload: agent.Auth.register(username, password)
    }),
    onUnload: () => dispatch({
        type: REGISTER_PAGE_UNLOADED
    })
})

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            error: ''
        }
        const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
        this.changeUsername = updateFieldEvent('username')
        this.changePassword = updateFieldEvent('password')
        this.changeConfirm = updateFieldEvent('confirm')
        
        this.submitForm = (username, password) => ev => {
            ev.preventDefault()
            if(this.props.confirm === this.props.password){
                this.setState({ error: '' })
                this.props.onSubmit(username, password)
            }else{
                this.setState({ error: 'Please confirm your password again:)' })
            }
        }
    }

    componentWillUnmount(){
        this.props.onUnload()
    }

    render(){
        const { username, password, confirm } = this.props

        return (
            <div className='auth-page'>
                <div className='container page'>
                    <div className='row'>
                        
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1 className='text-xs-center'>Sign up</h1>
                            <p className='text-xs-center'>
                                <Link to='login'>
                                    Have an account?
                                </Link>
                            </p>

                            <ListErrors errors={this.props.errors} />
                            {
                                this.state.error ?
                                <ul className='error-messages'><li>{this.state.error}</li></ul>
                                : null
                            }

                            <form onSubmit={this.submitForm(username, password)}>
                                <fieldset>

                                    <fieldset className='form-group'>
                                        <input
                                            className='form-control form-control-log'
                                            type='text'
                                            placeholder='Username'
                                            value={username}
                                            onChange={this.changeUsername} />
                                    </fieldset>

                                    <fieldset className='form-group'>
                                        <input
                                            className='form-control form-control-log'
                                            type='password'
                                            placeholder='Password'
                                            value={password}
                                            onChange={this.changePassword} />
                                    </fieldset>

                                    <fieldset className='form-group'>
                                        <input
                                            className='form-control form-control-log'
                                            type='password'
                                            placeholder='Confirm Password'
                                            value={confirm}
                                            onChange={this.changeConfirm} />
                                    </fieldset>

                                    <button
                                        className='btn btn-lg btn-primary pull-xs-right'
                                        type='submit'
                                        disabled={this.props.inProgress}>
                                        Sign up
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)