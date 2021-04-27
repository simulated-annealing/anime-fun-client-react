import React from 'react'
import { Link } from 'react-router-dom'


const AnimeCard = ({animeId, attr}) => { 

    return <> 
    <Link to={`/anime/${animeId}`} className="cover">
    {attr.posterImage && <img src={attr.posterImage.large} width="185" className="cover_image"/>}
    </Link>
    <Link to={`/anime/${animeId}`} className='title'> 
    {
        attr.canonicalTitle ||
        attr.titles.en ||
        attr.titles.en_jp ||
        attr.titles.ja_jp
    } 
    </Link>
    </>
}

export default AnimeCard