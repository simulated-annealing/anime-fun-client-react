import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import userService from '../services/user-service'
import feedbackService from '../services/feedback-service'

const FeedbackView = ({session}) => {

    const [fbs, setFbs] = useState([])

    const history = useHistory()

    useEffect(() => {
        if (!userService.isSessionValid(session) || session.user.role !== 'ADMIN') { 
            alert('You need to sign in as an ADMIN to visit this page.')
            history.push('/') 
            return
        }
        feedbackService.getFeedbacks().then(resp => {
            if (resp === 0) {
                alert('You don\'t have the permission to view user feedbacks.')
                history.push('/') 
                return
            }
            setFbs(resp)
        })
    }, [session])

    const toTimeFormat = now => {
        const date = new Date()
        date.setTime(now)
        return date.toLocaleString()
    }
    
    return (
    <div className="signup-page">
        <h4 className="signup-title">
            User Feedbacks
        </h4>
    { fbs.map(fb =>
    <div className="feedback-container">
        <div className="row mb-3">
        <label htmlFor="report_type_field" className="col-sm-2 col-form-label">
            Report Type
        </label>
        <div className="col-sm-10">
            <div className="select-role-wrap">
            <select className="select-report-type" value={fb.type} id="report_type_field" disabled>
                <option value="INAPPROPORIATE_WORD">inapproporiate comments</option>
                <option value="SYSTEM_BUG">system bug</option>
                <option value="WEB_DESIGN">web design</option>
                <option value="SUGGESTION">suggestion</option>
                <option value="OTHER">other</option>
            </select>
            </div>
        </div>
        </div>

        <div className="row mb-3">
        <label htmlFor="report-textarea" className="col-sm-2 col-form-label">
            Description
        </label>
        <div className="col-sm-10">
            <textarea className="description-textarea" rows="8" id="report-textarea"
                placeholder="We appreciate your feedback..." value={fb.description}/>
        </div>
        </div>

        <div className="float-right feedback-user-info">
            reported by
            <Link to={`/profile/${fb.username}`}>
                {` ${fb.username} `}
            </Link>
            on {toTimeFormat(fb.createAt)}
        </div>
    </div>)}
    </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(FeedbackView)