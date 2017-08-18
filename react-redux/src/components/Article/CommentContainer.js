import React from 'react' 
import { Link } from 'react-router'

import CommentInput from './CommentInput'
import CommentList from './CommentList'

// class CommentContainer extends React.Component {
//     render(){
//         return null
//     }
// }

const CommentContainer = props => {
    return (
        <div className='col-xs-12 col-md-8 offset-md-2'>
            {
                props.currentUser ?
                <CommentInput
                    errors={props.commentErrors}
                    slug={props.slug}
                    currentUser={props.currentUser} />
                :
                <p>
                    <Link to='login'>Sign in</Link>
                    &nbsp;or&nbsp;
                    <Link to='register'>sign up</Link>
                    &nbsp;to add comments on this article.
                </p>
            }
            
            <CommentList
                errors={props.updateErrors}
                comments={props.comments}
                slug={props.slug}
                currentUser={props.currentUser} />
        </div>
    )
}

export default CommentContainer