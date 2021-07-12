import { userService } from '../../services/user.service.axios.js'

export function login(credentials) { // Action Creator
    return dispatch => {
        return userService.login(credentials)
            .then((user) => {
                const action = {
                    type: 'SET_USER',
                    user
                }
                dispatch(action)
            })
    }
}
export function logout() { // Action Creator
    return dispatch => {
        return userService.logout()
            .then(() => {
                const action = {
                    type: 'SET_USER',
                    user: null
                }
                dispatch(action)
            })
    }
}