const initState = {
    user: {
        username: '',
    },
    expired: 0
}

const sessionReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_SESSION':
            return action.session
        case 'INVALIDATE_SESSION':
            return initState
        default:
            return state
    }
}

export default sessionReducer