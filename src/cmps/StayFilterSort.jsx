import { TextField } from '@material-ui/core'
// import { useForm } from '../services/customHooks'

import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { loadStays, setFilter } from '../store/actions/stay.actions.js'





export const StayFilterSort = () => {
   

    // const location = useLocation()
    // const searchParams = new URLSearchParams(location.search);
    // const sortBys = searchParams.get('sortBy')
    
    // const searchAll = searchParams.getAll('searchTxt', 'sortBy', 'type')
    // console.log('searchAll', searchAll)
    // console.log('sortBy', sortBys)

    const dispatch = useDispatch()
    const {  filterBy } = useSelector(state => state.stayModule)

    
    const history = useHistory()
    
   
    const { type, sortBy, searchTxt } = filterBy
    
    const handleChange = ({ target }) => {
        const { name, value } = target

        const newFilterBy = {...filterBy, [name]: value}
        
        dispatch(setFilter(newFilterBy))        
        dispatch(loadStays(newFilterBy))
        history.push(`/stay?searchTxt=${searchTxt}&type=${newFilterBy.type}&sortBy=${newFilterBy.sortBy}`)
        

    }

    

    return (
        <div className="filter-css">
            <h1>Places to stay for you</h1>
            <TextField
                select
                name="type"
                size="small"
                label="Type"
                color="secondary"
                value={type}
                SelectProps={{ native: true }}
                variant="outlined"
                onChange={handleChange}
            >
                <option value="all">All</option>
                <option value="Caravan">Caravan</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Guesthouse">Guesthouse</option>
            </TextField>
            <TextField
                select
                name="sortBy"
                size="small"
                label="Sort by"
                value={sortBy}
                color="secondary"
                SelectProps={{ native: true }}

                id="outlined-basic"
                variant="outlined"

                onChange={handleChange}
            >
                <option value="name">Name</option>
                <option value="price">Price</option>
            </TextField>

        </div >
    )
}


