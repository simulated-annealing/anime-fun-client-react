const KITSU_URL='https://kitsu.io/api/edge'

export const buildParams = (filters, sorts) => {
    let params = ''
    sorts.forEach((attr, idx) =>{
        params = idx === 0 ? 'sort=' : `${params},`
        params = `${params}${attr}`
    })
    Object.keys(filters).forEach(key => {
        if (filters[key] === '') return
        if (params !== '') params = `${params}&`
        params=`${params}filter[${key}]=${filters[key]}`
    })
    console.log('built params :', params)
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
    buildParams,
    searchAnimes,
    getTrendingAnimes,
    getAnimeById
}
