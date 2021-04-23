import React from 'react'
import {Link} from 'react-router-dom'

const AnimeItem = ({animeId, attr}) => {

    const animeTypes = {
        ONA: 'ONA',
        OVA: 'OVA',
        TV: 'TV Show',
        movie: 'Movie',
        music: 'Music',
        special: 'Special'
    }

    return (
    <div className="anime_item">
    <Link to={`/anime/${animeId}`} className="cover">
        <img src={attr.posterImage.small} width="50" className="cover_image"/>
    </Link>

    <div className="content">
        <div className="up-row">
            <Link to={`/anime/${animeId}`} className="title-wrap">
            {
                attr.canonicalTitle ||
                attr.titles.en ||
                attr.titles.en_jp ||
                attr.titles.ja_jp
            } 
            </Link>
            <div className="genres">
                <Link to={`/anime/${animeId}`} className="genre">
                    advernture
                </Link>
            </div>
        </div>
        <div className="up-row">
            <div className="percentage">
                {Number.isNaN(Number.parseInt(attr.averageRating)) ? "no rating" : 
                    `${Number.parseInt(attr.averageRating, 10)}%`}
                <div className="sub-row">
                    {`${attr.userCount} users`}
                </div>
            </div>
        </div>
        <div className="up-row">
            {animeTypes[attr.subtype] || attr.subtype}
            {attr.episodeCount && <div className="sub-row">
                {`${attr.episodeCount} episodes`}
            </div>}
        </div>
        <div className="up-row">
            {attr.startDate}
            <div className="sub-row">
                {attr.status}
            </div>
        </div>
    </div>

    </div>)
}

export default AnimeItem