import React from 'react'
import {connect} from 'react-redux'
import AnimeCard from './anime-card'

const SearchResult = ({animes}) => {
    return (
        <div className="container">
        {animes.length === 0 && <h3 className="title_h3"> Opps, nothing found here... </h3>}
        {console.log(animes)}
        <div className="row"> 
        {
            animes && animes.slice(0, 5).map(am => 
            <div className="col-sm">
                <AnimeCard attr={am.attributes} animeId={am.id} links={am.links}/>
            </div>)
        }
        </div>
        </div>
    )
}

const stpm = state => ({
    animes: state.searchReducer.animes.data
})

const dtpm = dispatch => ({})

export default connect(stpm, dtpm)(SearchResult)