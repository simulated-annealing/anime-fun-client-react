import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const SignUp = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    return (
    <div class="container">
        <h4>
            Sign Up To Anime Fun
        </h4>
        <br/>

        <div class="row mb-3">
            <label for="username_field"
                    class="col-sm-2 col-form-label">
                Username
            </label>
            <div class="col-sm-10">
                <input class="form-control"
                        id="username_field"
                        placeholder="Your Username"/>
            </div>
        </div>

        <div class="row mb-3">
            <label for="password_field"
                    class="col-sm-2 col-form-label">
                Password
            </label>
            <div class="col-sm-10">
                <input class="form-control"
                        id="password_field"
                        placeholder="Your Password"
                        type="password"/>
            </div>
        </div>

        <div class="row mb-3">
            <label for="verify_password_field"
                    class="col-sm-2 col-form-label">
                Verify Password
            </label>
            <div class="col-sm-10">
                <input class="form-control"
                        id="verify_password_field"
                        placeholder="Verify Your Password"
                        type="password"/>
            </div>
        </div>

        <div class="row mb-1">
            <label class="col-sm-2 col-form-label">
            </label>
            <div class="col-sm-10">
                <a href="../profile/profile.template.client.html"
                    class="btn btn-primary btn-block">
                    Sign Up
                </a>
            </div>
        </div>

        <div class="row">
            <label class="col-sm-2 col-form-label">
            </label>
            <div class="col">
                <Link to='/login'>
                    Already have an account? 
                </Link>
            </div>
            <div class="col">
                <Link to='/'>
                    Home Page
                </Link>
            </div>
        </div>
    </div>
    )

}

export default SignUp