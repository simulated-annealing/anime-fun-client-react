import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import activityService from '../services/activity-service'
import userService from '../services/user-service'

const ActivitySection = ({session}) => {

    const [activities, setActivities] = useState([])
    const [userActivities, setUserActivities] = useState([])

    const toTimeFormat = now => {
        const date = new Date()
        date.setTime(now)
        return date.toLocaleString()
    }

    const updateActivities = () => {
        activityService.getActivities().then(resp =>
            setActivities(resp.map(act => ({
                ...act,
                url: act.animeId && act.animeId !== '' ? `/anime/${act.animeId}` : `/profile/${act.username}` 
            }))))
        if (userService.isSessionValid(session))
            activityService.getActivitiesForUser(session.user.username).then(resp =>
                setUserActivities(resp.map(act => ({
                    ...act,
                    url: act.animeId && act.animeId !== '' ? `/anime/${act.animeId}` : `/profile/${act.username}` 
                }))))
    }

    const buildContent = act => {
        if (act.action === 'SIGN_UP')
            return `Welcome new member! User ${act.username} recently joined our community!!! `
        if (act.action === 'SIGN_IN')
            return `Welcome back! User ${act.username} just logged in. `
        if (act.action === 'POST_REVIEW')
            return `User ${act.username} just posted a comment. `
        if (act.action === 'ADD_FAVORITE')
            return `User ${act.username} just add an anime to favorite collection. `
        return `Unknow action ${act.action}`
    }
    
    const buildUserContent = act => {
        if (act.action === 'SIGN_UP')
            return `Welcome! You becomed an member of our community on ${act.createAt}!!! `
        if (act.action === 'SIGN_IN')
            return `Welcome back! You recently signed in on ${toTimeFormat(act.now)} `
        if (act.action === 'POST_REVIEW')
            return `You posted a review `
        if (act.action === 'ADD_FAVORITE')
            return `You add an anime to your favorite collection. `
        return `Unknow action ${act.action}`
    }

    useEffect(updateActivities, [session])

    return (
        <div className="container">
            <h1 className="activity-title"> Recent Activities </h1>
            <div className="activity-wrap">
            {
                activities.slice(0, 3).map((act, idx) => 
                    <div className="activity-item"key={idx}>
                        <Link to={act.url} className="activity-item-content"> {buildContent(act)} </Link>
                        <div className="activity-item-date"> {toTimeFormat(act.now)} </div>
                    </div>)
            }
            </div>
            {
                userService.isSessionValid(session) && <>
                    <h1 className="activity-title"> Your Activities </h1> 
                    <div className="activity-wrap">
                    {
                        userActivities.slice(0, 3).map((act, idx) => 
                            <div className="activity-item"key={idx}>
                                <Link to={act.url} className="activity-item-content"> {buildUserContent(act)} </Link>
                                <div className="activity-item-date"> {toTimeFormat(act.now)} </div>
                            </div>)
                    }
                    </div>
                </>
            }
        </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(ActivitySection)