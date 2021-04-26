const initState = {
    user: {
        username: '',
        email: '',
        createAt: '',
        favorites: [],
        watchlist: [],
    },
    expired: 0
}

const sessionReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_SESSION':
            return action.session
        case 'INVALIDATE_SESSION':
            return initState
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

export default sessionReducer