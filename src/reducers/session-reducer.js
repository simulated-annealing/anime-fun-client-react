const initState = {
    user: {
        username: '',
        email: '',
        createAt: '',
        favorites: [],
        watchlist: [],
        avatar: 'https://i.pinimg.com/564x/08/98/40/089840829e7083a6021ce1b0c4e35a4b.jpg'
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
        case 'UPDATE_USER_AVATAR':
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.avatar
                }
            }
        default:
            return state
    }
}

export default sessionReducer