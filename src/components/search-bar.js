import React, { useEffect } from 'react'
import { useState } from 'react'
import kitsuService from '../services/kitsu-service'
import { connect } from 'react-redux'


const SearchBar = ({searchAnimes}) => {
    const [filter, setFilter] = useState({text:''})

    useEffect(()=>
        searchAnimes(filter), [filter])

    return (
    <div className="container">
        <h2>Search</h2>
        <input className="form-control" type="text" placeholder="search anime here"
            value={filter.text}
            onChange={e =>
                setFilter({
                    ...filter,
                    text: e.target.value
                })}/>

    </div>)
}

const stpm = state => ({})

const dtpm = dispatch => ({
    searchAnimes: filter =>
        kitsuService.searchAnimes(filter).then(animes =>
            dispatch({type:'SEARCH_ANIMES', animes}))
})

export default connect(stpm, dtpm)(SearchBar)