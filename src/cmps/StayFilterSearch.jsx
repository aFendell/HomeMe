import React from 'react'
import { useForm } from '../services/customHooks'

export const StayFilterSearch = ({ onSetFilter }) => {
    const [filterBy, handleChange] = useForm({ 
        searchTxt: '', 
        price: 'all', 
        type: 'all', 
        sortBy: 'all' }, onSetFilter)

    const { searchTxt } = filterBy
    return (
        <div className="_1xq16jy">
            <input className="_1xq16jy" autoComplete="off" type="text" name="searchTxt" 
            value={searchTxt} placeholder="Where are you going?" onChange={handleChange} />
        </div >
    )
}
