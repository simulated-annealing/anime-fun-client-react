import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import AnimeProfileItem from './anime-profile-item'
import userService from '../services/user-service'
import followService from '../services/follow-service'


const Profile = ({session, invalidateSession, updateUser, updateAvatar}) => {
    const history = useHistory()
    const [user, setUser] = useState({
        username: 'unknown',
        role: 'unknown',
        email: 'unknown',
        createAt: 'unknown',
        description: 'unknown',
        avatar: 'https://i.pinimg.com/564x/08/98/40/089840829e7083a6021ce1b0c4e35a4b.jpg',
        favorites: [],
        watchlist: [],
        exp: 0,
        authorization: 0,
        dob: 'unknown'
    })

    const {username} = useParams()
    const [followers, setFollowers] = useState([])
    const [followees, setFollowees] = useState([])
    const [followed, setFollowed] = useState(false)
    const [avatars, setAvatars] = useState({})

    const fetchProfile = () => {
        if (username === undefined && !userService.isSessionValid(session)){
            alert('Sign in to view your profile. Click to redirect to the login page')
            history.push('/login') 
        } else if (username === undefined) {
            setUser(session.user)
            fetchFollows(session.user.username)
        } else {
            userService.getProfileByUsername(username).then(resp => {
                if (resp === 0) {
                    alert(`User ${username} does not exist! Click to redirect to the home page`)
                    history.push('/') 
                    return
                } 
                setUser(resp)
                fetchFollows(resp.username)
            })
        }
    }

    const fetchFollows = username => {
        followService.getFollowers(username).then(resp => {
            setFollowers(resp)
            setFollowed(undefined !== resp.find(f => f.follower === session.user.username))
            resp.forEach(f => 
                userService.getAvatar(f.follower).then(ava =>
                    setAvatars(prevState => ({
                        ...prevState,
                        [f.follower]: ava.avatar
                    }))
                ))
        })
        followService.getFollowees(username).then(resp => {
            setFollowees(resp)
            resp.forEach(f => 
                userService.getAvatar(f.followee).then(ava => { 
                    setAvatars(prevState => ({
                        ...prevState,
                        [f.followee]: ava.avatar
                    }))
                }))
        })
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

    const followUser = () => {
        if (!userService.isSessionValid(session)) {
            alert(' You need to sign in to follow this user.')
            return
        }
        if (session.user.username === user.username) {
            alert(' You can\'t follow your self.')
            return
        }
        followService.postFollow({
            follower: session.user.username,
            followee: user.username,
        }).then(resp => {
            if (resp === 0) {
                alert('failed to follow this user, please try again later')
                return
            }
            setFollowed(true)
        })
    }

    const unfollowUser = () => {
        const follow = followers.find(f => f.follower === session.user.username)
        if (follow === undefined) {
            alert('failed to unfollow this user, please try again later!!!')
            return
        }
        followService.deleteFollow(follow._id).then(resp => {
            if (resp === 0) {
                alert('failed to unfollow this user, please try again later')
                return
            }
            setFollowed(false)
        })
    }

    const updateAvatarClicked = () => {
        updateAvatar(user.username).then(resp => {
            if (resp === 0) {
                alert('update avatar failed, please try again later.')
            }
        })
    }

    useEffect(fetchProfile, [session, username])

    return (
    <div className="profile-page" >
    <h4 className="profile-favorites-title"> Personal Information </h4>
    <div className="profile-information-container">
    <div className="profile-information-content">
        <div className="profile-section">
            <div className="profile-section-avatar">
                <img className="profile-section-avatar-img" src={user.avatar}></img>
            </div>
            {(!session.user || session.user.username !== user.username) && <div className="profile-section-title">
                <button onClick={followed?unfollowUser:followUser}
                    className={followed? "profile-unfollow" : "profile-follow"}>
                    {followed?'Followed':'Follow Me'}
                </button>
            </div>}
            {session.user && session.user.username === user.username && <div className="profile-section-title">
                <button onClick={updateAvatarClicked} className="profile-feel-lucky">
                    I'm feeling lucky!
                </button>
            </div>}
        </div>
        <div>
        <div className="profile-section">
            <div className="profile-section-title"> User Name </div>
            <div className="profile-section-data"> {user.username} </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-title"> Role </div>
            <div className="profile-section-data"> {user.role} </div>
        </div>
        {user && user.role === 'USER' && <div className="profile-section">
            <div className="profile-section-title"> Exp </div>
            <div className="profile-section-data"> {user.exp} </div>
        </div>}
        {user && user.role === 'ADMIN' && <div className="profile-section">
            <div className="profile-section-title" htmlFor="author_field"> Authorization Code </div>
            <input className="profile-section-data" id="author_filed" type="number"
                disabled = {username !== undefined && username !== session.user.username}
                value={user.authorization} onChange={e => setUser({
                    ...user,
                    authorization: e.target.value
                })}/>
        </div>}
        </div>
        <div>
        <div className="profile-section">
            <div className="profile-section-title"> Joined Anime Fun On </div>
            <div className="profile-section-data"> {user.createAt} </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-title"> Email </div>
            <div className="profile-section-data"> {user.email} </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-title"> Date of Birth </div>
            <div className="profile-section-data"> {user.dob}</div>
        </div>
        </div>
    </div>
        <div className="profile-section">
            <div className="profile-section-title" htmlFor="aboutme"> About me </div>
            <textarea rows="8" id="aboutme" className="description-textarea" value={user.description}
                disabled = {username !== undefined && username !== session.user.username}
                placeholder="This user is too lazy to leave something here..." onChange = {e => {
                    setUser({
                        ...user,
                        description: e.target.value
                    })
                }}/>
        </div>

        {session.user && session.user.username === user.username && <div className="profile-section-buttons">
            <button className="btn btn-danger profile-section-signout" onClick={invalidateSession}>
                Sign Out
            </button>
            <button className="btn btn-success profile-section-update" onClick={updateClicked}>
                Update 
            </button>
        </div>}

        </div>

        {followees.length !==0 && <h4 className="profile-favorites-title"> {user.username} followed these people</h4>}
        <div className="profile-follower-container">
        {followees.map(f => 
            <Link className="profile-follower-link" to={`/profile/${f.followee}`}>
                <img className="profile-follower-img" src={avatars[f.followee]}/>
                <div className="profile-follower-name">
                    {f.followee}
                </div>
            </Link>)}
        </div>

        {followers.length !==0 && <h4 className="profile-favorites-title"> These people followed {user.username} </h4>}
        <div className="profile-follower-container">
        {followers.map(f => 
            <Link className="profile-follower-link" to={`/profile/${f.follower}`}>
                <img className="profile-follower-img" src={avatars[f.follower]}/>
                <div className="profile-follower-name">
                    {f.follower}
                </div>
            </Link>)}
        </div>

        {user.favorites.length && <h4 className="profile-favorites-title"> My Favorites </h4>}
        <div className="profile-anime-list-container">
        {user.favorites.map(animeId => <AnimeProfileItem animeId={animeId}/>)}
        </div>
        {user.watchlist.length && <h4 className="profile-favorites-title"> My Watch List </h4>}
        <div className="profile-anime-list-container">
        {user.watchlist.map(animeId => <AnimeProfileItem animeId={animeId}/>)}
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
        }),
    updateAvatar: username =>
        userService.updateAvatar(username).then(resp => {
            if (resp !== 0) {
                dispatch({
                    type: 'UPDATE_USER_AVATAR',
                    avatar: resp.avatar
                })
            }
            return resp
        })
})

export default connect(stpm, dtpm)(Profile)