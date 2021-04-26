import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import kitsuService from '../services/kitsu-service'
import userService from '../services/user-service'
import CommentSection from './comment-section'
import AnimeDetailSideBar from './anime-detail-sidebar'
import { FaHeart } from 'react-icons/fa'
import { connect } from 'react-redux'

const AnimeDetail = ({session, addFavorite, delFavorite, addWatchlist, delWatchlist}) => {
    const {animeId} = useParams()
    const [attr, setAttr] = useState({})
    const [fav, setFav] = useState(false)
    const [watch, setWatch] = useState(false)

    const isFavorite = () => 
        userService.isSessionValid(session) &&
            session.user.favorites &&
            session.user.favorites.indexOf(animeId) >= 0

    const addToFavorite = () => {
        if (!userService.isSessionValid(session)) {
            alert('You need to sign in before adding this anime to your favorites')
            return
        }
        addFavorite(animeId).then(resp => {
            if (resp === 0) {
                alert('failed to add to the favorite list')
                return
            }
            setFav(true)
        })
    }

    const delFromFavorite = () => {
        delFavorite(animeId).then(resp => {
            if (resp === 0) {
                alert('failed to delete from the favorite list')
                return
            }
            setFav(false)
        })
    }

    const inWatchlist = () => 
        userService.isSessionValid(session) && 
            session.user.watchlist &&
            session.user.watchlist.indexOf(animeId) >= 0

    const addToWatchlist = () => {
        if (!userService.isSessionValid(session)) {
            alert('You need to sign in before adding this anime to your watch list')
            return
        }
        addWatchlist(animeId).then(resp => {
            if (resp === 0) {
                alert('failed to add to the watch list')
                return
            }
            setWatch(true)
        })
    }

    const delFromWatchlist = () => {
        delWatchlist(animeId).then(resp => {
            if (resp === 0) {
                alert('failed to delete from the watch list')
                return
            }
            setWatch(false)
        })
    }

    useEffect(() => { 
        kitsuService.getAnimeById(animeId).then(
            res => setAttr(res.data.attributes))
        setFav(isFavorite())
        setWatch(inWatchlist())
        }, [animeId])
    
    return ( 
    <div>
        {attr.coverImage && <div className="banner"
            style={{'background-image': `url(${attr.coverImage.large})`}}>
        </div>}

        <div className="detail-header-wrap">
        <div className="container-detail-desc">
            <div className="overlap-banner">
                {attr.posterImage && <img src={attr.posterImage.large} className="cover-detail"/>} 
                <div className="detail-actions">
                    <div className="detail-add-watch" onClick={watch?delFromWatchlist:addToWatchlist}>
                        {watch ? "Watch List Added" : "Watch Later"}
                    </div>
                    <div className="detail-add-favorite">
                        <FaHeart onClick={fav ? delFromFavorite : addToFavorite}
                            className={fav?'detail-add-favorite-fav':''}/>
                    </div>
                </div>
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

const stpm = state => ({
    session: state.sessionReducer
})

const dtpm = dispatch => ({
    addFavorite: animeId => 
        userService.addFavorite(animeId).then(resp => {
            if (resp === 0) {
                return resp
            }
            dispatch({
                type: 'UPDATE_USER',
                user: resp
            })
            return resp
        }),
    delFavorite: animeId =>
        userService.delFavorite(animeId).then(resp => {
            if (resp === 0) {
                return resp
            }
            dispatch({
                type: 'UPDATE_USER',
                user: resp
            })
            return resp
        }),
    addWatchlist: animeId => 
        userService.addWatchlist(animeId).then(resp => {
            if (resp === 0) {
                return resp
            }
            dispatch({
                type: 'UPDATE_USER',
                user: resp
            })
            return resp
        }),
    delWatchlist: animeId =>
        userService.delWatchlist(animeId).then(resp => {
            if (resp === 0) {
                return resp
            }
            dispatch({
                type: 'UPDATE_USER',
                user: resp
            })
            return resp
        }),
})

export default connect(stpm, dtpm)(AnimeDetail)