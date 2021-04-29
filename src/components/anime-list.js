import React from 'react'
import AnimeCard from './anime-card'

const AnimeList = ({title, animes, userOnly=false}) => {

    return <>
    <h3 className='title_h3 anime_list_title'>
    {
        [...title].map((c, idx) => 
            <span className={userOnly ? `color-text-${idx%7}` : ''}>{c}</span>)
    }
    </h3>
    <div className="row"> 
    {
        animes && animes.filter(am =>
            am.attributes.coverImage && am.attributes.coverImage.small).
            slice(0, 5).map(am => 
        <div className="col-sm">
            <AnimeCard attr={am.attributes} animeId={am.id} links={am.links}/>
        </div>)
    }
    </div>
    </>
}

export default AnimeList