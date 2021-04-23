import React from 'react'

const AnimeDetailSideBar = ({attr}) => {
    return (
    <div className="side-bar-wrap">
        <div className="side-bar-rank">
            #{attr.popularityRank} Most Popular All Time
        </div>
        <div className="side-bar-data">
            <div className="side-bar-data-set">
                <div className="side-bar-dataset-title"> Average Rating </div>
                <div className="side-bar-dataset-value"> {attr.averageRating} </div>
            </div>
            <div className="side-bar-data-set">
                <div className="side-bar-dataset-title"> Format </div>
                <div className="side-bar-dataset-value"> {attr.subtype} </div>
            </div>
            <div className="side-bar-data-set">
                <div className="side-bar-dataset-title"> Format </div>
                <div className="side-bar-dataset-value"> {attr.subtype} </div>
            </div>
            <div className="side-bar-data-set">
                <div className="side-bar-dataset-title"> Episode Duration </div>
                <div className="side-bar-dataset-value"> {attr.episodeLength} mins </div>
            </div>
            <div className="side-bar-data-set">
                <div className="side-bar-dataset-title"> Status </div>
                <div className="side-bar-dataset-value"> {attr.status} </div>
            </div>
            <div className="side-bar-data-set">
                <div className="side-bar-dataset-title"> Start Date </div>
                <div className="side-bar-dataset-value"> {attr.startDate} </div>
            </div>
            <div className="side-bar-data-set">
                <div className="side-bar-dataset-title"> Age Rating </div>
                <div className="side-bar-dataset-value"> {attr.ageRating} </div>
            </div>
            <div className="side-bar-data-set">
                <div className="side-bar-dataset-title"> Guide </div>
                <div className="side-bar-dataset-value"> {attr.ageRatingGuide} </div>
            </div>
        </div>
    </div>)
}

export default AnimeDetailSideBar