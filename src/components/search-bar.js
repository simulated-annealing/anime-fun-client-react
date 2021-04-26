import React, { useEffect } from 'react'
import { useState } from 'react'
import kitsuService from '../services/kitsu-service'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import querySearch from 'stringquery'


const SearchBar = ({searchAnimes}) => {
    const [filter, setFilter] = useState({text:''})
    const history = useHistory()
    const search = querySearch(useLocation().search)

    useEffect(()=> {
        let params = kitsuService.buildParams(filter, [])
        if (params !== '') {
            searchAnimes(filter)
            return
        }
        if (search.query !== undefined && search.query !== '') {
            setFilter({
                ...filter,
                text: search.query
            })
            params = kitsuService.buildParams({
                ...filter,
                text: search.query
            }, [])
        }
        if (params !== '') {
            searchAnimes(filter)
            return
        }
        history.push('/')
    }, [filter])


    return (
    <div className="container">
        <div className="filters">
            <div>
                <div className="name">
                    Search
                </div>
                <div className="search-wrap">
                    <input className="search" type="text" placeholder="Search something"
                        value={filter.text}
                        onChange={e => {
                            setFilter({
                                ...filter,
                                text: e.target.value})
                            history.replace({
                                pathname:'/search/anime',
                                search:`query=${e.target.value}`})
                        }}/>
                </div>
            </div>

            <div>
                <div className="name">
                    Genres
                </div>
                <div className="search-wrap">
                    <select className="search">
                        <option className="option">Any</option>
                        <option className="option">Adventure</option>
                        <option className="option">Time</option>
                    </select>
                </div>
            </div>


            <div>
                <div className="name">
                    Year
                </div>
                <div className="search-wrap">
                    <select className="search">
                        <option className="option">Any</option>
                        <option className="option">Adventure</option>
                        <option className="option">Time</option>
                    </select>
                </div>
            </div>

            <div>
                <div className="name">
                    Season
                </div>
                <div className="search-wrap">
                    <select className="search">
                        <option className="option">Any</option>
                        <option className="option">Adventure</option>
                        <option className="option">Time</option>
                    </select>
                </div>
            </div>

            <div>
                <div className="name">
                    Format
                </div>
                <div className="search-wrap">
                    <select className="search">
                        <option className="option">Any</option>
                        <option className="option">Adventure</option>
                        <option className="option">Time</option>
                    </select>
                </div>
            </div>
        </div>
    </div>)
}


const stpm = state => ({})

const dtpm = dispatch => ({
    searchAnimes: filter =>
        kitsuService.searchAnimes(filter).then(animes =>
            dispatch({type:'SEARCH_ANIMES', animes}))
})

export default connect(stpm, dtpm)(SearchBar)