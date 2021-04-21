import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
    <div className="container">
    <Link to="/"> 
        Home
    </Link>
    <Link to="/signup" className="float-right"> 
        Sign Up
    </Link>
    <Link to="/login" className="float-right"> 
        Login
    </Link>
    <br/>
    </div>)
}

export default NavBar