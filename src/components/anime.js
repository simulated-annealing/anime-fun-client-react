import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import kitsuService from '../services/kitsu-service'

const Anime = () => {
    const {animeId} = useParams()
    const [attr, setAttr] = useState({})

    useEffect(() => kitsuService.getAnimeById(animeId).then(res =>
        setAttr(res.data.attributes)), [animeId])
    
    return ( 
    <div>
        {attr && attr.coverImage && <img src={attr.coverImage.small} width="100%"/>}

        <div className="container">
            <div className="row">
                {attr && attr.posterImage && <img src={attr.posterImage.small} width="18%"/>} 
                <p> {attr.synopsis} </p>
            </div>
        </div>
    </div> )
}

export default Anime