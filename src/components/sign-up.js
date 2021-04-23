import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import userService from '../services/user-service'

const SignUp = ({session, updateSession}) => {

    const [verifyPassword, setVerifyPassword] = useState('')

    const [newUser, setNewUser] = useState({
        username:'', 
        password:'',
        role:'USER',
        description: 'tell us more about yourself...',
    })

    const history = useHistory()

    useEffect(() => {
        if (userService.isSessionValid(session)) 
            history.push('/profile') 
        }, [session])
    
    const signup = () => {
        if (newUser.password !== verifyPassword) {
            alert("password does not match!")
            return
        }
        if (newUser.username.trim() === '' || newUser.password.trim() === '') {
            alert("username or password can't be empty!")
            return
        }
        userService.signup(newUser).then(user => {
            if (user) {
                updateSession({
                    user,
                    expired: 1
                })
                return
            }
            alert('Failed to sign up, try again...')
        })
    }

    return (
    <div className="container">
        <h4>
            Sign Up To Anime Fun
        </h4>
        <br/>

        <div className="row mb-3">
        <label htmlFor="username_field" className="col-sm-2 col-form-label">
            Username
        </label>
        <div className="col-sm-10">
        <input className="form-control" id="username_field" placeholder="Your Username"
            value={newUser.username} onChange={e => 
                setNewUser({
                    ...newUser,
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
            type="password" value={newUser.password} onChange={e =>
                setNewUser({
                    ...newUser,
                    password: e.target.value
                })}/>
        </div>
        </div>

        <div className="row mb-3">
        <label htmlFor="verify_password_field" className="col-sm-2 col-form-label">
            Verify Password
        </label>
        <div className="col-sm-10">
            <input className="form-control" id="verify_password_field"
                    placeholder="Verify Your Password" type="password"
                    value={verifyPassword} onChange={e =>
                        setVerifyPassword(e.target.value)}/>
        </div>
        </div>

        <div className="row mb-3">
        <label htmlFor="user_role_field" className="col-sm-2 col-form-label">
            User Role
        </label>
        <div className="col-sm-10">
            <div className="select-role-wrap">
            <select className="select-role" value={newUser.role}
                onChange={e => setNewUser({
                    ...newUser,
                    role: e.target.value
                })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
            </select>
            </div>
        </div>
        </div>

        <div className="row mb-1">
        <label className="col-sm-2 col-form-label">
        </label>
        <div className="col-sm-10">
            <button className="btn btn-primary btn-block" onClick={signup}>
                Sign Up
            </button>
        </div>
        </div>

        <div className="row">
        <label className="col-sm-2 col-form-label">
        </label>
        <div className="col">
            <Link to='/login'>
                Already have an account? 
            </Link>
        </div>
        <div className="col">
            <Link to='/'>
                Home Page
            </Link>
        </div>
        </div>
    </div>
    )

}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({
    updateSession: session => dispatch({type: 'UPDATE_SESSION', session})
})

export default connect(stpm, dtpm)(SignUp)