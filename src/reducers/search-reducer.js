const initState = {
    animes: {
        data: []
    }
}

const searchReducer = (state=initState, action) => {
    switch(action.type) {
        case 'SEARCH_ANIMES':
            return {
                ...state,
                animes: action.animes
            }
        default:
            return state
    }
}

export default searchReducer