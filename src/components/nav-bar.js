import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import userService from '../services/user-service'

const NavBar = ({session}) => {

    return (
    <div className="container">
    <Link to="/"> 
        Home
    </Link>
    {
        !userService.isSessionValid(session) && <>
        <Link to="/signup" className="float-right"> 
            Sign Up
        </Link>
        <Link to="/login" className="float-right"> 
            Login
        </Link>
        </>
    }
    {
        userService.isSessionValid(session) && 
        <Link to="/profile" className="float-right"> 
            welcome {session.user.username}
        </Link>
    }
    <br/>
    </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(NavBar)