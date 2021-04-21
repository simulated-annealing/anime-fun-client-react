const KITSU_URL='https://kitsu.io/api/edge'

const buildParams = (filters, sorts) => {
    let params = ''
    sorts.forEach((attr, idx) =>{
        params = idx === 0 ? 'sort=' : `${params},`
        params = `${params}${attr}`
    })
    Object.keys(filters).forEach(key => {
        if (params !== '') params = `${params}&&`
        params=`${params}filter[${key}]=${filters[key]}`
    })
    return params
}

export const searchAnimes = (filters = {}, sorts = []) => 
    fetch(`${KITSU_URL}/anime?${buildParams(filters, sorts)}`).
        then(response => response.json())

export const getTrendingAnimes = () => 
    fetch(`${KITSU_URL}/trending/anime`).then(response => response.json())

export const getAnimeById = animeId =>
    fetch(`${KITSU_URL}/anime/${animeId}`).then(response => response.json())

export default {
    searchAnimes,
    getTrendingAnimes,
    getAnimeById
}
