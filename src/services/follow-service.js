const FOLLOW_URL ='http://localhost:3001/api/follows'

export const getFollows = () => 
    fetch(FOLLOW_URL).then(resp =>
        resp.json())

export const getFollowers = username =>
    fetch(`${FOLLOW_URL}/followers/${username}`).then(resp =>
        resp.json())

export const getFollowees = username => 
    fetch(`${FOLLOW_URL}/followees/${username}`).then(resp =>
        resp.json())

export const postFollow = follow => 
    fetch(FOLLOW_URL, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(follow),
        headers: {
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())

export const deleteFollow = followId =>
    fetch(`${FOLLOW_URL}/${followId}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(res => res.json())

export default {
    getFollows,
    getFollowers,
    getFollowees,
    postFollow,
    deleteFollow
}
