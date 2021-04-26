const COMMENT_URL='http://localhost:3001/api/comments'

export const getComments = () => 
    fetch(COMMENT_URL).then(resp =>
        resp.json())

export const getCommentsForAnime = animeId => 
    fetch(`${COMMENT_URL}/anime/${animeId}`).then(resp =>
        resp.json())

export const postCommentsForAnime = (comment, animeId) => 
    fetch(`${COMMENT_URL}/anime/${animeId}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())

export const deleteComment = commentId =>
    fetch(`${COMMENT_URL}/${commentId}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(res => res.json())

export default {
    getComments,
    getCommentsForAnime,
    postCommentsForAnime,
    deleteComment
}
