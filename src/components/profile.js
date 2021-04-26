import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import userService from '../services/user-service'
import AnimeProfileItem from './anime-profile-item'

const Profile = ({session, invalidateSession, updateUser}) => {
    const history = useHistory()
    const [user, setUser] = useState({
        username: 'unknown',
        role: 'unknown',
        email: 'unknown',
        createAt: 'unknown',
        description: 'unknown',
        favorites: [],
        watchlist: []
    })

    const {username} = useParams()

    const fetchProfile = () => {
        if (username === undefined && !userService.isSessionValid(session)){
            alert('Sign in to view your profile. Click to redirect to the login page')
            history.push('/login') 
        } else if (username === undefined) {
            setUser(session.user)
        } else {
            userService.getProfileByUsername(username).then(resp => {
                if (resp === 0) {
                    alert(`User ${username} does not exist! Click to redirect to the home page`)
                    history.push('/') 
                    return
                } 
                setUser(resp)
            })
        }
    }

    const updateClicked = () => {
        updateUser(user).then(resp => {
            if (resp === 0) {
                alert('failed to update user, please try later')
                return 
            }
            setUser(resp)
            alert('profile updated!')
        })
    }

    useEffect(fetchProfile, [session, username])

    return (
    <div className="profile-page" >
    <h4 className="profile-favorites-title"> Personal Information </h4>
    <div className="profile-container">
        <div className="profile-section">
            <div className="profile-section-title"> User Name </div>
            <div className="profile-section-data"> {user.username} </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-title"> Role </div>
            <div className="profile-section-data"> {user.role} </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-title"> Joined Anime Fun On </div>
            <div className="profile-section-data"> {user.createAt} </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-title"> Email </div>
            <div className="profile-section-data"> {user.email} </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-title"> Description </div>
            <textarea className="description-textarea" value={user.description}
                disabled = {username !== undefined}
                placeholder="leave your comments here..." onChange = {e => {
                    setUser({
                        ...user,
                        description: e.target.value
                    })
                }}/>
        </div>

        <div>
            <button className="btn btn-danger profile-section-signout" onClick={invalidateSession}>
                Sign Out
            </button>
            <button className="btn btn-success profile-section-update" onClick={updateClicked}>
                Update 
            </button>
        </div>
        </div>
        <h4 className="profile-favorites-title"> My Favorites </h4>
        <div className="profile-anime-list-container">
        { user.favorites.map(animeId => <AnimeProfileItem animeId={animeId}/>) }
        </div>
        <h4 className="profile-favorites-title"> My Watch List </h4>
        <div className="profile-anime-list-container">
        { user.watchlist.map(animeId => <AnimeProfileItem animeId={animeId}/>) }
        </div>
    </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({
    invalidateSession: () => 
        userService.signout().then(resp => 
            dispatch({type: 'INVALIDATE_SESSION'})),
    updateUser: user =>
        userService.updateUser(user).then(resp => {
            if (resp !== 0)
                dispatch({
                    type: 'UPDATE_USER',
                    user: resp
                })
            return resp
        })
})

export default connect(stpm, dtpm)(Profile)