import React, { useEffect } from 'react'
import { useState } from 'react'
import kitsuService from '../services/kitsu-service'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import querySearch from 'stringquery'


const allcategories = [ 'Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi',
    'Fantasy', 'Horror', 'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance']
const years = [...Array(40).keys()].map(x => 2022-x)
const seasons = ['Spring', 'Summer', 'Fall', 'Winter']
const subtypes = [ ['ONA', 'ONA'], ['OVA', 'OVA'], ['TV', 'TV Show'], 
    ['movie', 'Movie'], ['music', 'Music'], ['special', 'Special']]


const SearchBar = ({searchAnimes}) => {
    const [filter, setFilter] = useState({
        text: '',
        categories: '',
        season: '',
        year: '',
        subtype: ''
    })
    const [initLoad, setInitLoad] = useState(true)
    const history = useHistory()
    const location = useLocation()

    const buildUrlSearchFromFilter = () => {
        let params = ''
        Object.keys(filter).forEach(key => {
            const val = filter[key]
            if (val === undefined || val === '') return
            if (params !== '') params = `${params}&`
            params=`${params}${key}=${val}`
        })
        return params
    }

    const tryFilter = () => {
        const apiParams = kitsuService.buildParams(filter, [])
        if (apiParams === '') return false
        searchAnimes(filter)
        const search = buildUrlSearchFromFilter()
        history.replace(`/search/anime?${search}`)
        return true
    } 

    const tryUrl = () => {
        let findSearch = false
        const search = querySearch(location.search)
        let newFilter = {}
        if (search.text && search.text !== '') {
            newFilter.text = search.text
            findSearch = true
        }
        if (search.categories && search.categories !== '') {
            newFilter.categories = search.categories
            findSearch = true
        }
        if (search.season && search.season !== '') {
            newFilter.season = search.season
            findSearch = true
        }
        if (search.year && search.year !== '') {
            newFilter.year = search.year
            findSearch = true
        }
        if (search.subtype && search.subtype !== '') {
            newFilter.subtype = search.subtype
            findSearch = true
        }
        if (findSearch) {
            setFilter(newFilter)
        }
        return findSearch
    } 

    useEffect(()=> {
        if(!tryFilter()) {
            if (initLoad) {
                if (!tryUrl())
                    history.push('/')
            } else {
                history.push('/')
            } 
        } 
        setInitLoad(false)
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
                        }}/>
                </div>
            </div>

            <div>
                <div className="name">
                    Genres
                </div>
                <div className="search-wrap">
                    <select className="search" value={filter.categories} onChange={e =>
                        setFilter({
                            ...filter,
                            categories:e.target.value
                        })}>
                    <option value="" className="option">Any</option>
                    {
                        allcategories.map((c, i) => 
                        <option className="option" key={i} value={c.toLowerCase()}> 
                            {c} 
                        </option>)
                    }
                    </select>
                </div>
            </div>


            <div>
                <div className="name">
                    Year
                </div>
                <div className="search-wrap">
                    <select className="search"
                        value={filter.year} onChange={e =>
                        setFilter({
                            ...filter,
                            year: e.target.value
                        })}>
                    <option value="" className="option">Any</option>
                    {
                        years.map((c, i) => 
                        <option className="option" key={i} value={c}> 
                            {c} 
                        </option>)
                    }
                    </select>
                </div>
            </div>

            <div>
                <div className="name">
                    Season
                </div>
                <div className="search-wrap">
                    <select className="search" value={filter.season} onChange={e => 
                        setFilter({
                            ...filter,
                            season: e.target.value
                        })}>
                    <option value="" className="option">Any</option>
                    {
                        seasons.map((c, i) => 
                        <option className="option" key={i} value={c.toLowerCase()}> 
                            {c} 
                        </option>)
                    }
                    </select>
                </div>
            </div>

            <div>
                <div className="name">
                    Format
                </div>
                <div className="search-wrap">
                    <select className="search" value={filter.subtype}
                        onChange={e => 
                            setFilter({
                                ...filter,
                                subtype: e.target.value
                        })}>
                    <option value="" className="option">Any</option>
                    {
                        subtypes.map((c, i) => 
                        <option className="option" key={i} value={c[0]}> 
                            {c[1]} 
                        </option>)
                    }
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