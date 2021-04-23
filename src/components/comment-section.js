import React, { useEffect, useState } from 'react'
import CommentItem from './comment-item'
import commentService from '../services/comment-service'

const CommentSection = ({animeId}) => {

    const [myComment, setMyComment] = useState({content:'', animeId})
    const [comments, setComments] = useState([])

    const updateComments = () => 
        commentService.getCommentsForAnime(animeId).then(resp =>
            setComments(resp))
    
    const postComment = () => {
        if (myComment.content.trim() === '') {
            alert("failed, comments must not be empty.")
            return 
        }
        commentService.postCommentsForAnime(myComment, animeId).then(updateComments)
    }

    useEffect(updateComments, [animeId])

    return (
        <div>
            <h1 className="comment-title">User Reviews</h1>
            <div className="detail-review-wrap">
            {
                comments.map((c, idx) => 
                    <CommentItem key={idx} comment={c} updateComments={updateComments}/>)
            }
            </div>
            {
                comments.length === 0 && <div className="no-comment-found-text">
                    No reivews made for this anime yet, come and be the first one to comment!
                    </div>
            }
            <h1 className="comment-title">Contribute with others</h1>
            <textarea className="comment-textarea" value={myComment.content}
                placeholder="leave your comments here..." onChange = {e => 
                    setMyComment({
                        ...myComment,
                        content: e.target.value
                    })
                }/>
            <button className="btn btn-secondary float-right post-btn"
                onClick={postComment}>
                Post
            </button>
        </div>)
}

export default CommentSection