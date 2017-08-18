import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './ListErrors'
import ImageUpload from './ImageUpload'
import agent from '../agent'

class SettingsForm extends React.Component {
    constructor(){
        super()

        this.state = {
            image: '',
            password: ''
        }

        this.updateState = field => ev => this.setState({ [field]: ev.target.value })
        this.uploadImage = url => this.setState({ image: url })

        this.submitForm = ev => {
            ev.preventDefault()
      
            const user = this.state
            if(!user.password){
              delete user.password
            }
      
            this.props.onSubmitForm(user)
        }
    }

    componentWillMount(){
        if(this.props.currentUser){
            this.setState({
                username: this.props.currentUser.username,
                image: this.props.currentUser.image
            })
        }
    }

    // In case you want to stay (without redirectTo '/') after successful updates.
    // componentWillReceiveProps(nextProps){
    //   if(nextProps.currentUser){
    //     this.setState({
    //       username: nextProps.currentUser.username,
    //       image: nextProps.currentUser.image,
    //       password: ''
    //     })
    //   }
    // }

    render(){
        return (
            <form onSubmit={this.submitForm}>
                <fieldset>
                    <strong>Password:</strong>
                    <fieldset className='form-group'>
                        <input
                        className='form-control form-control-lg'
                        type='password'
                        placeholder='New Password'
                        value={this.state.password}
                        onChange={this.updateState('password')} />
                    </fieldset>

                    <i>Update your Profile Pic:</i>
                    <ImageUpload changeImage={this.uploadImage} />

                    <button
                        className='btn btn-lg btn-primary pull-xs-right'
                        type='submit'
                        disabled={this.props.inProgress}>
                        Update Settings
                    </button>
                </fieldset>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    ...state.settings,
    currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
    onSubmitForm: user => dispatch({
        type: 'SETTINGS_SAVED',
        payload: agent.Auth.save(user)
    }),
    onClickLogout: () => dispatch({
        type: 'LOGOUT'
    })
})

class Settings extends React.Component {
    render(){
        return (
            <div className='settings-page'>
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <div className='text-xs-center'>
                                <h1>Your Settings</h1>
                                <div className='row'>
                                    <div className='offset-sm-4 col-sm-4 offset-xs-3 col-xs-6'>
                                        <img
                                        className='img-fluid'
                                        src={this.props.currentUser.image}
                                        alt={this.props.currentUser.username} />
                                    </div>
                                </div>
                            </div>
                            
                            <ListErrors errors={this.props.errors} />

                            <SettingsForm
                                currentUser={this.props.currentUser}
                                onSubmitForm={this.props.onSubmitForm} />

                            <hr />

                            <button
                                className='btn btn-outline-danger'
                                onClick={this.props.onClickLogout}>
                                Or click here to logout
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)