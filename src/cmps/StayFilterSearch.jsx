import React from 'react'
import { useForm } from '../services/customHooks'


export const StayFilterSearch = ({ onSetFilter }) => {
    const [filterBy, handleChange] = useForm({
        searchTxt: '',
        type: 'all',
        sortBy: 'all'
    }, onSetFilter)

    const { searchTxt } = filterBy
    return (
        <div className="_1xq16jy">


            <select
                className="_1xq16jy"

                name="searchTxt"
                value={searchTxt}
                variant="outlined"
                onChange={handleChange}
            >
                <option value="">Choose a place</option>
                <option value="rio">Rio de Janeiro</option>
                <option value="new york">New York</option>
                <option value="sydney">Sydney</option>
            </select>
        </div >
    )
}
