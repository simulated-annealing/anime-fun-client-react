import React from 'react'
import {connect} from 'react-redux'
import AnimeItem from './anime-item'

const SearchResult = ({animes}) => {
    return (<div className="container">
        {
            animes && animes.length === 0 && 
            <h3 className="title_h3"> Opps, nothing found here... </h3>
        }
        <div className="anime_item_table">
        {
            animes && animes.map((am, idx) => 
                <AnimeItem key={idx} attr={am.attributes} animeId={am.id}/>)
        }
        </div>
    </div>)
}

const stpm = state => ({
    animes: state.searchReducer.animes.data
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(SearchResult)