import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';
// import { useHistory, useLocation, useParams } from 'react-router-dom'
import { StayList } from '../cmps/StayList'
import { StayFilterSort } from '../cmps/StayFilterSort.jsx'
// import { StayFilterSearch } from '../cmps/StayFilterSearch.jsx'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { Header } from '../cmps/Header'

export const StayApp = () => {
    // const location = useLocation()
    // const searchParams = new URLSearchParams(location.search);
    // const searchTxt = searchParams.get('searchTxt')
    // console.log('searchTxt', searchTxt)
    // const history = useHistory()
    const dispatch = useDispatch()
    const { stays, filterBy } = useSelector(state => state.stayModule)

    useEffect(() => {
        dispatch(loadStays(filterBy))
        // history.push(`/stay?searchTxt=${filterBy.searchTxt}&type=${filterBy.type}&price=${filterBy.price}&sortBy=${filterBy.sortBy}`)
    }, [filterBy])

    const onSetFilter = (filterBy) => {
        dispatch(setFilter(filterBy))
    }

    return (
        <div className="appp main-layout">
            <Header />
            <section className="stay-app">
                {/* <StayFilterSort onSetFilter={(filterBy) => dispatch(loadStays(filterBy))}/> */}
                <StayFilterSort onSetFilter={onSetFilter} />
                <StayList stays={stays} />
            </section>
        </div>
    )

}