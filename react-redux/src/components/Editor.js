import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './ListErrors'
import agent from '../agent'

const mapStateToProps = state => ({
    ...state.editor
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({
        type: 'EDITOR_PAGE_LOADED',
        payload
    }),
    onUpdateField: (key, value) => dispatch({
        type: 'UPDATE_FIELD_EDITOR',
        key,
        value
    }),
    onSubmit: payload => dispatch({
        type: 'ARTICLE_SUBMITTED',
        payload
    }),
    onUnload: () => dispatch({
        type: 'EDITOR_PAGE_UNLOADED'
    })
})

class Editor extends React.Component {
    constructor(){
        super()
        
        const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
        this.changeTitle = updateFieldEvent('title')
        this.changeBody = updateFieldEvent('body')

        this.submitForm = ev => {
            ev.preventDefault()
            const article = {
                title: this.props.title,
                body: this.props.body
            }
            const slug = { slug: this.props.slug }
            const payload = this.props.slug ?
                agent.Articles.update(Object.assign(article, slug))
                : agent.Articles.create(article)
            
            this.props.onSubmit(payload)
        }
    }
    
    componentWillMount(){
        if(this.props.params.slug){
            this.props.onLoad(agent.Articles.get(this.props.params.slug))
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params.slug !== nextProps.params.slug){
            this.props.onUnload()
            if(nextProps.params.slug){
                return this.props.onLoad(agent.Articles.get(this.props.params.slug))
            }
        }
    }

    componentWillUnmount(){
        this.props.onUnload()
    }

    render(){
        return (
            <div className='editor-page'>
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1 col-xs-12'>
            
                            <ListErrors errors={this.props.errors} />
                
                            <form onSubmit={this.submitForm}>
                                <fieldset>
                                    <fieldset className='form-group'>
                                        <input
                                        className='form-control form-control-lg'
                                        type='text'
                                        placeholder="Article Title"
                                        value={this.props.title}
                                        onChange={this.changeTitle} />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <textarea
                                        className='form-control form-control-lg'
                                        rows='15'
                                        placeholder="Write your article (in markdown)"
                                        value={this.props.body}
                                        onChange={this.changeBody} />
                                    </fieldset>
                                </fieldset>
                                <button
                                    className='btn btn-lg pull-xs-right btn-primary'
                                    type='submit'
                                    disabled={this.props.inProgress}>
                                    { this.props.slug ? 'Update' : 'Publish' } Article
                                </button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)