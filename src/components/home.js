import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import kitsuService from '../services/kitsu-service'
import userService from '../services/user-service'
import AnimeList from './anime-list'


const Home = ({session}) => {

    const [trendingNow, setTrendingNow] = useState({})
    const [popularThisSeason, setPopularThisSeason] = useState({})
    const [upcomingNextSeason, setUpcomingNextSeason] = useState({})
    const [allTimePopular, setAllTimePopular] = useState({})
    const [recommendForUser, setRecommentForUser] = useState({})

    const year='2020'
    const season='summer'
    const nextSeason='fall'

    useEffect(() => {
        kitsuService.getTrendingAnimes().
            then(animes => setTrendingNow(animes))
        kitsuService.searchAnimes({year, season}, ['popularityRank']).
            then(animes => setPopularThisSeason(animes))
        kitsuService.searchAnimes({year, season:nextSeason}, ['popularityRank']).
            then(animes => setUpcomingNextSeason(animes))
        kitsuService.searchAnimes({}, ['popularityRank']).
            then(animes => setAllTimePopular(animes))
        if (userService.isSessionValid(session)) {
            const userdob = session.user.dob || '1998-01-01'
            const yy = Math.min(Math.max(Number.parseInt(userdob.split('-')[0])+16, 2001), 2021)
            kitsuService.searchAnimes({year:yy}, ['popularityRank']).
                then(animes => setRecommentForUser(animes))
        }
    }, [year, season, nextSeason, session])

    return (
    <div className="container"> 
        { userService.isSessionValid(session) && <>
        <AnimeList title="SPECIAL FOR YOU" animes={recommendForUser.data} userOnly={true}/>
        <br/>
        </>}
        <AnimeList title="TRENDING NOW" animes={trendingNow.data}/>
        <br/>
        <AnimeList title="POPULAR THIS SEASON" animes={popularThisSeason.data}/>
        <br/>
        <AnimeList title="UPCOMING NEXT SEASON" animes={upcomingNextSeason.data}/>
        <br/>
        <AnimeList title="ALL TIME POPULAR" animes={allTimePopular.data}/>
    <br/>
    </div>)
}

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(Home)