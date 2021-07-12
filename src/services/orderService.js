import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

// const data = require('../data/stays.json')

// let gOrders = data.order
window.storageService = storageService;

// const STOR

// const axios = require('axios');

// - // for Deverlop without backend
// const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    remove,
    save,
    
}

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/order'

function query() {
    return httpService.get(`order`)

    // return storageService.query(STORAGE_KEY).then(orders => {
    //     if (!orders || !orders.length) orders = gOrders
    //     return orders
    // })
    // return axios.get(`${BASE_URL}`).then((res=>res.data))
}

function getById(orderId) {
    // console.log(orderId)
    return httpService.get(`order/${orderId}`)
    // return storageService.get(STORAGE_KEY, orderId)
    // return axios.get(`${BASE_URL}/${orderId}`).then((res => res.data))
}
function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
    // return storageService.remove(STORAGE_KEY, stayId)
    // return axios.delete(`${BASE_URL}/${stayId}`).then((res => res.data))
}

// httpService.put(stay/stayId, stay)

async function save(order) {
    if (order._id) {
        return await httpService.put(`order/${order._id}`, order)
        // return storageService.put(STORAGE_KEY, order)
        // return axios.put(`${BASE_URL}`, order).then(res => res.data)
    } else {
        return await httpService.post(`order`, order)
        // return storageService.post(STORAGE_KEY, order)
        // return axios.post(`${BASE_URL}`, order).then(res => res.data)
    }
}
