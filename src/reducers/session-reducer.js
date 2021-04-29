const initState = {
    user: {
        username: '',
        email: '',
        createAt: '',
        favorites: [],
        watchlist: [],
        avatar: '',
        exp: 0,
        authorization: 0,
        dob: '',
        role: 'USER',
        password: ''
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