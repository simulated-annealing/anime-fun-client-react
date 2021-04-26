const ACTIVITY_URL='http://localhost:3001/api/activities'

export const getActivities = () => 
    fetch(`${ACTIVITY_URL}`).then(resp =>
        resp.json())

export const getActivitiesForUser = username => 
    fetch(`${ACTIVITY_URL}/user/${username}`).then(resp =>
        resp.json())

export default {
    getActivities,
    getActivitiesForUser
}
