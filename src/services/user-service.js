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

export const isSessionValid = session => 
    (session.expired && session.expired !== 0)

export default {
    signup,
    signin,
    signout,
    getProfile,
    isSessionValid,
}