const initState = {
    animes: [],
    trending: []
}

const homeReducer = (state=initState, action) => {
    switch(action.type) {
        case 'GET_ANIMES':
            return {
                ...state,
                animes: action.animes
            }
        case 'GET_TRENDING':
            return {
                ...state,
                trending: action.trending
            }
        default:
            return state
    }
}

export default homeReducer