
import { storageService } from './storage-service.js'

const axios = require('axios')

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api'

function login(credentials) {
    console.log('credentials:', credentials)
    return axios.post(`login`, credentials).then(res => res.data)
        .then(user => {
            storageService.save(STORAGE_KEY, user)
            return user
        })
}
function signup(userInfo) {
    return axios.post(`signup`, userInfo).then(res => res.data)
        .then(user => {
            storageService.save(STORAGE_KEY, user)
            return user
        })
}
function logout() {
    return axios.post(`logout`).then(res => res.data)
        .then(() => {
            storageService.save(STORAGE_KEY, null)
            return null
        })
}

function getLoggedinUser() {
    return storageService.load(STORAGE_KEY)
}