import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ListErrors from './ListErrors'
import agent from '../agent'

import {
    UPDATE_FIELD_AUTH,
    LOGIN,
    LOGIN_PAGE_UNLOADED
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
        type: LOGIN,
        payload: agent.Auth.login(username, password)
    }),
    onUnload: () => dispatch({
        type: LOGIN_PAGE_UNLOADED
    })
})

class Login extends React.Component {
    constructor(){
        super()
        const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
        this.changeUsername = updateFieldEvent('username')
        this.changePassword = updateFieldEvent('password')
        
        this.submitForm = (username, password) => ev => {
            ev.preventDefault()
            this.props.onSubmit(username, password)
        }
    }
    
    componentWillUnmount(){
        this.props.onUnload()
    }

    render(){
        const { username, password } = this.props

        return (
            <div className='auth-page'>
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1 className='text-xs-center'>Sign In</h1>
                            <p className='text-xs-center'>
                                <Link to='register'>
                                    Need an account?
                                </Link>
                            </p>

                            <ListErrors errors={this.props.errors} />

                            <form onSubmit={this.submitForm(username, password)}>
                                <fieldset>
                                    
                                    <fieldset className='form-group'>
                                        <input
                                            className='form-control form-control-lg'
                                            type='text'
                                            placeholder='Username'
                                            value={username}
                                            onChange={this.changeUsername} />
                                    </fieldset>
                                    
                                    <fieldset className='form-group'>
                                        <input
                                            className='form-control form-control-lg'
                                            type='password'
                                            placeholder='Password'
                                            value={password}
                                            onChange={this.changePassword} />
                                    </fieldset>

                                    <button
                                        className='btn btn-lg btn-primary pull-xs-right'
                                        type='submit'
                                        disabled={this.props.inProgress}>
                                        Sign in
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)