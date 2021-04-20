import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => {

    return (
    <div class="container">
        <h1>
            Sign In
        </h1>

        <div class="row wbdv-row">
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

        <div class="row wbdv-row">
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

        <div class="row wbdv-row">
            <label class="col-sm-2 col-form-label">
            </label>
            <div class="col-sm-10">
                <Link to="#"
                    class="btn btn-primary btn-block">
                Sign In
                </Link>
            </div>
        </div>

        <div class="row">
            <label class="col-sm-2 col-form-label">
            </label>
            <div class="col">
                <Link to="/">
                    Home Page
                </Link>
            </div>
            <div class="col">
                <Link to="/signup">
                    Sign Up
                </Link>
            </div>

        </div>
    </div>)
}

export default Login