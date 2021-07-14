// import { httpService } from './http.service'
import { storageService } from './async-storage.service.js'
import Geocode from "react-geocode";
import { httpService } from './http.service.js'


// const data = require('../data/stays.json')
// let gStays = data.stay
window.storageService = storageService;

Geocode.setApiKey("AIzaSyBicrFlwKD-lW0_kqfkTRcJI1O2YrTS1GQ");
// const STOR

// const axios = require('axios');

// - // for Deverlop without backend
// const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    locFromAddress
}

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/stay'


function query(filterBy) {
    // var queryStr = (!filterBy) ? '' : `?searchTxt=${filterBy.searchTxt}&type=${filterBy.type}&price=${filterBy.price}&sortBy=${filterBy.sortBy}`
    // return httpService.get(`stay/${queryStr}`)
    // console.log('filterBy in FE service:', filterBy);
    return httpService.get(`stay`, filterBy)

    // return storageService.query(STORAGE_KEY).then(stays => {
    //     if (!stays || !stays.length) stays = gStays
    //     return stays
    // })

    // return axios.get(`${BASE_URL}`).then((res=>res.data))
}

function getById(stayId) {
    // console.log(stayId)
    return httpService.get(`stay/${stayId}`)
    // return storageService.get(STORAGE_KEY, stayId)
    // return axios.get(`${BASE_URL}/${stayId}`).then((res => res.data))
}
function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
    // return storageService.remove(STORAGE_KEY, stayId)
    // return axios.delete(`${BASE_URL}/${stayId}`).then((res => res.data))
}
async function save(stay) {
    if (stay._id) {
        return await httpService.put(`stay/${stay._id}`, stay)
        // return storageService.put(STORAGE_KEY, stay)
        // return axios.put(`${BASE_URL}`, stay).then(res => res.data)
    } else {
        return await httpService.post(`stay`, stay)
        // return storageService.post(STORAGE_KEY, stay)
        // return axios.post(`${BASE_URL}`, stay).then(res => res.data)
    }
}

// function save(stay) {
//     console.log('stay from service', stay)
//     if (stay._id) {
//         return httpService.put(`stay/${stay._id}`, stay);
//     } else {
//         return httpService.post(`stay`, stay);
//     }
// }

async function locFromAddress(location) {
    const res = await Geocode.fromAddress(location)
    const { lat, lng } = res.results[0].geometry.location
    return { lat, lng }
}



