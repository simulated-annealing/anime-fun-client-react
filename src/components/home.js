import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import kitsuService from '../services/kitsu-service'



const Home = ({animes, trending, getAnimes, getTrending}) => {

    useEffect(() => {
        getAnimes()
        getTrending()
    }, [])

    return (<> 
    <h1>Anime Fun Home Page.</h1>
    <h4>Trending Now</h4>
    <ul> 
    {
        trending.data && trending.data.map((am, idx) => 
            <li key={idx}> 
            {am.attributes.titles.en || 
            am.attributes.titles.en_jp || 
            am.attributes.titles.ja_jp} 
            </li>)
    }
    </ul>


    <h4>Animes</h4>
    <ul> 
    {
        animes.data && animes.data.map((am, idx) => 
            <li key={idx}> 
            {am.attributes.titles.en || 
            am.attributes.titles.en_jp || 
            am.attributes.titles.ja_jp} 
            </li>)
    }
    </ul>

    </>)
}

const stpm = state => ({
    animes: state.animes,
    trending: state.trending,
})


const dtpm = dispatch => ({
    getAnimes: () => kitsuService.getAnimes().then(animes =>
        dispatch({type:'GET_ANIMES', animes})), 
    getTrending: () => kitsuService.getTrending().then(trending =>
        dispatch({type:'GET_TRENDING', trending})), 
})

export default connect(stpm, dtpm)(Home)