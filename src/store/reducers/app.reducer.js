import {userService} from '../../services/user.service.axios.js'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedinUser: action.user }
        // case 'UPDATE_SCORE':
        //     return { ...state, loggedinUser: { ...state.loggedinUser, score: state.loggedinUser.score + action.diff } }

        default:
            return state
    }
}
