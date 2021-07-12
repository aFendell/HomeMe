import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';
import { StayList } from '../cmps/StayList'
import { StayFilterSort } from '../cmps/StayFilterSort.jsx'
// import { StayFilterSearch } from '../cmps/StayFilterSearch.jsx'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'


export const StayApp = () => {
    const dispatch = useDispatch()
    const { stays, filterBy } = useSelector(state => state.stayModule)

    useEffect(() => {
        dispatch(loadStays(filterBy))
    }, [filterBy])

    // const onDeleteStay = (stayId) => {
    //     dispatch(removeStay(stayId))
    // }

    return (
        <section>
            <StayFilterSort onSetFilter={(filterBy) => dispatch(setFilter(filterBy))} />
            {/* <StayFilterSearch onSetFilter={this.onSetFilter}/> */}
            {stays && <StayList stays={stays} />}
        </section>
    )
}