import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import userService from '../services/user-service'
import commentService from '../services/comment-service'


const CommentItem = ({comment, session, updateComments}) => {

    const deleteComment = () => {
        if (!userService.isSessionValid(session)) {
            alert('You need to sign in as an admin to delete the comment.')
            return
        }
        if (session.user.role !== 'ADMIN') {
            alert('You need to be an admin role to delete the comment.')
            return
        }
        commentService.deleteComment(comment._id).then(updateComments)
    }

    return (
        <div className="comment-item">
            <Link to={comment.username !== 'Guest' ? `/profile/${comment.username}`:'#'}>
                <img className="comment-user-logo"/>
            </Link>
            <div className="comment-item-area">
                <div className="comment-item-content">
                    {comment.content}
                </div>
                <div className="comment-item-date"> 
                    {comment.createAt} by {comment.username}
                </div>
                <div className="comment-item-delete" onClick={deleteComment}>
                    x
                </div>
            </div>
        </div>
    )
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(CommentItem)