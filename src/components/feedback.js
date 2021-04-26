import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import userService from '../services/user-service'
import feedbackService from '../services/feedback-service'

const Feedback = ({session}) => {

    const [fb, setFb] = useState({
        username:'', 
        email:'',
        type:'SYSTEM_BUG',
        description: ''
    })

    const history = useHistory()

    useEffect(() => {
        if (!userService.isSessionValid(session)) { 
            alert('You need to sign in to visit this page.')
            history.push('/') 
        }
        setFb({
            ...fb,
            username: session.user.username,
            email: session.user.email,
        })
    }, [session])
    
    const submitFb = () =>
        feedbackService.postFeedback(fb).then(resp =>
            alert("Thank you for submitting your feedbacks. We'll have a team review your request, and may contact you if needed."))

    return (
    <div className="signup-page">
        <h4 className="signup-title">
            Feedback System
        </h4>
    <div className="signup-container">
        <div className="row mb-3">
        <label htmlFor="report_type_field" className="col-sm-2 col-form-label">
            Report Type
        </label>
        <div className="col-sm-10">
            <div className="select-role-wrap">
            <select className="select-report-type" value={fb.type} id="report_type_field"
                onChange={e => setFb({
                    ...fb,
                    type: e.target.value
                })}>
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
                placeholder="We appreciate your feedback..." value={fb.description}
                onChange = {e => setFb({
                    ...fb,
                    description: e.target.value
                })}/>
        </div>
        </div>

        <div className="row mb-1">
        <label className="col-sm-2 col-form-label">
        </label>
        <div className="col-sm-10">
            <button className="btn btn-primary btn-block signup-button" onClick={submitFb}>
                Submit
            </button>
        </div>
        </div>
    </div>
    </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(Feedback)