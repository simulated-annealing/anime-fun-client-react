import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import kitsuService from '../services/kitsu-service'
import AnimeList from './anime-list'



const Home = () => {

    const [trendingNow, setTrendingNow] = useState({})
    const [popularThisSeason, setPopularThisSeason] = useState({})
    const [upcomingNextSeason, setUpcomingNextSeason] = useState({})
    const [allTimePopular, setAllTimePopular] = useState({})

    const year='2021'
    const season='spring'
    const nextSeason='summer'

    useEffect(() => {
        kitsuService.getTrendingAnimes().
            then(animes => setTrendingNow(animes))
        kitsuService.searchAnimes({year, season}).
            then(animes => setPopularThisSeason(animes))
        kitsuService.searchAnimes({year, season:nextSeason}).
            then(animes => setUpcomingNextSeason(animes))
        kitsuService.searchAnimes({}, ['popularityRank']).
            then(animes => setAllTimePopular(animes))
    }, [])

    return (<div className="container"> 
    <div>
    <Link to="/signup" className="btn btn-primary float-right"> 
        Sign Up
    </Link>
    <Link to="/login" className="float-right"> 
        Login
    </Link>
    </div>
    <br/>
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

export default Home