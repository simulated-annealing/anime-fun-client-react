import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import kitsuService from '../services/kitsu-service'
import CommentSection from './comment-section'
import AnimeDetailSideBar from './anime-detail-sidebar'

const AnimeDetail = () => {
    const {animeId} = useParams()
    const [attr, setAttr] = useState({})

    useEffect(() => kitsuService.getAnimeById(animeId).then(res =>
        setAttr(res.data.attributes)), [animeId])
    
    return ( 
    <div>
        {attr.coverImage && <div className="banner"
            style={{'background-image': `url(${attr.coverImage.large})`}}>
        </div>}

        <div className="detail-header-wrap">
        <div className="container-detail-desc">
            <div className="overlap-banner">
                {attr.posterImage && <img src={attr.posterImage.large} className="cover-detail"/>} 
            </div>
            <div className="content-detail"> {
                attr.titles && <h1 className="title-detail"> { 
                    attr.canonicalTitle ||
                    attr.titles.en ||
                    attr.titles.en_jp ||
                    attr.titles.ja_jp}
                </h1>}
                <p className="description-detail"> {attr.synopsis} </p>
            </div>
        </div>
        </div>
        <div className="content-detail-comments">
            <AnimeDetailSideBar attr={attr}/>
            <CommentSection animeId={animeId}/>
        </div>
    </div> )
}

export default AnimeDetail