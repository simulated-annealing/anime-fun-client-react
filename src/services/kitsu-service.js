const KITSU_URL='https://kitsu.io/api/edge'


const getAnimes = () => 
    fetch(`${KITSU_URL}/anime`).then(response => response.json())

const getTrending = () => 
    fetch(`${KITSU_URL}/trending/anime`).then(response => response.json())


export default {
    getAnimes,
    getTrending
}