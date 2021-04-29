const USER_URL='http://localhost:3001/api/users'

export const signup = user => 
    fetch(USER_URL, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())

export const signin = credential =>
    fetch(`${USER_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(credential),
        headers: {
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())

export const signout = () =>
    fetch(`${USER_URL}/logout`, {
        method: 'GET',
        credentials: 'include'
    }).then(status => {})

export const getProfile = () => 
    fetch(`${USER_URL}/profile`, {
        method: 'GET',
        credentials: 'include'
    }).then(resp => resp.json())

export const getProfileByUsername = username => 
    fetch(`${USER_URL}/${username}`, {
        method: 'GET',
        credentials: 'include'
    }).then(resp => resp.json())

export const updateUser = user =>
    fetch(`${USER_URL}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())

export const addFavorite = animeId =>
    fetch(`${USER_URL}/favorites/${animeId}`, {
        method: 'PUT',
        credentials: 'include'
    }).then(resp => resp.json())

export const delFavorite = animeId =>
    fetch(`${USER_URL}/favorites/${animeId}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(resp => resp.json())

export const addWatchlist = animeId =>
    fetch(`${USER_URL}/watchlist/${animeId}`, {
        method: 'PUT',
        credentials: 'include'
    }).then(resp => resp.json())

export const delWatchlist = animeId =>
    fetch(`${USER_URL}/watchlist/${animeId}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(resp => resp.json())

export const isSessionValid = session => 
    session.expired && session.expired !== 0 ? true : undefined

export const updateAvatar = username => 
    fetch(`${USER_URL}/${username}/avatar/`, {
        method: 'PUT',
        credentials: 'include'
    }).then(resp => resp.json())

export const getAvatar = username => 
    fetch(`${USER_URL}/${username}/avatar`).then(resp => 
        resp.json())

export default {
    signup,
    signin,
    signout,
    updateUser,
    getProfile,
    getProfileByUsername,
    addFavorite,
    delFavorite,
    addWatchlist,
    delWatchlist,
    isSessionValid,
    updateAvatar,
    getAvatar
}