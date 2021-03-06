import React from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import userService from '../services/user-service'
import logo from '../imgs/logo_transparent.png'

const NavBar = ({session}) => {

    const {animeId} = useParams()

    return (
    <div className={animeId === undefined ? "nav-container" : "nav-container-detail"}>
    <div className="nav-content">
    <Link to="/" className="nav-logo"> 
        <img className="nav-logo-img" src={logo}/>
    </Link>
    <div className="nav-controls">
    {
        !userService.isSessionValid(session) && <>
        <Link to="/login" className="nav-login"> Login </Link>
        <Link to="/signup" className="nav-signup"> Sign Up </Link>
        </>
    }
    {
        userService.isSessionValid(session) && <>
        <Link to="/profile" className="nav-login"> Welcome, {session.user.username} </Link>
        <Link to="/feedback" className="nav-signup"> Feedback </Link>
        </>
    }
    </div>
    </div>
    </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(NavBar)