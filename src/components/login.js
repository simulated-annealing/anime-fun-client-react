import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import userService from '../services/user-service'

const Login = ({session, updateSession}) => {

    const [credential, setCredential] = useState({
        username:'', 
        password:''
    })

    const history = useHistory()

    useEffect(() => {
        if (userService.isSessionValid(session))
            history.push('/profile')
        } ,[session])
    
    const signin = () => {
        userService.signin(credential).then(user => {
            if (user) {
                updateSession({
                    user,
                    expired: 1
                })
                return;
            }
            alert('invalid username or password, try again...')
        })
    }


    return (
    <div className="login-page">
        <h4 className="login-title">
            Sign In
        </h4>
    <div className="login-container">
        <div className="row mb-3">
        <label htmlFor="username_field" className="col-sm-2 col-form-label">
            Username
        </label>
        <div className="col-sm-10">
        <input className="form-control" id="username_field" placeholder="Your Username"
            value={credential.username} onChange={e => 
                setCredential({
                    ...credential,
                    username: e.target.value
                })}/>
        </div>
        </div>

        <div className="row mb-3">
        <label htmlFor="password_field" className="col-sm-2 col-form-label">
            Password
        </label>
        <div className="col-sm-10">
        <input className="form-control" id="password_field" placeholder="Your Password"
            type="password" value={credential.password} onChange={e =>
                setCredential({
                    ...credential,
                    password: e.target.value
                })}/>
        </div>
        </div>

        <div className="row">
        <label className="col-sm-2 col-form-label">
        </label>
        <div className="col-sm-10">
        <button className="btn btn-primary btn-block login-button" onClick={signin}>
            Sign In
        </button>
        </div>
        </div>

        <div>
            <Link to="/signup" className="float-right">
                Don't have an account? 
            </Link>
        </div>
    </div>
    </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({
    updateSession: session => dispatch({type: 'UPDATE_SESSION', session})
})

export default connect(stpm, dtpm)(Login)