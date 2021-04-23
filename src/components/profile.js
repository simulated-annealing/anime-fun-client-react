import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import userService from '../services/user-service'

const Profile = ({session, invalidateSession}) => {
    const history = useHistory()

    useEffect(() => {
        if (!userService.isSessionValid(session)){
            alert('You haven\'t logged in yet. Click to redirect to the login page')
            history.push('/login') 
        }} ,[session])

    return (
    <div className="container">
        <h4> Welcome {session.user.username}  </h4>
        <button className="btn btn-danger" onClick={invalidateSession}>
            Sign Out
        </button>
        <Link to='/'> Home </Link>
    </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({
    invalidateSession: () => 
        userService.signout().then(resp => 
            dispatch({type: 'INVALIDATE_SESSION'}))
})

export default connect(stpm, dtpm)(Profile)