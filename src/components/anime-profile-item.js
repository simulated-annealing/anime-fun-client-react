import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import kitsuService from '../services/kitsu-service'

const AnimeProfileItem = ({animeId}) => {

    const animeTypes = {
        ONA: 'ONA',
        OVA: 'OVA',
        TV: 'TV Show',
        movie: 'Movie',
        music: 'Music',
        special: 'Special'
    }

    const [attr, setAttr] = useState({
        posterImage: {
            small: ''
        },
        titles: []
    })

    useEffect(() => {
        kitsuService.getAnimeById(animeId).then(anime => {
            if (anime && anime.data && anime.data.attributes)
                setAttr(anime.data.attributes)
        })
    }, [animeId])

    return (
    <div className="anime_item">
    <Link to={`/anime/${animeId}`} className="cover">
        {attr.posterImage && <img src={attr.posterImage.small} width="50" className="cover_image"/>}
    </Link>

    <div className="anime-profile-item-content">
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

export default AnimeProfileItem