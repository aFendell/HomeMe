import { useSelector } from 'react-redux'
import React from 'react';
import { StayList } from '../cmps/StayList'
import { StayFilterSort } from '../cmps/StayFilterSort.jsx'

export const StayApp = () => {


    const { stays } = useSelector(state => state.stayModule)
    
    return (
        <div className="appp main-layout">
            <section className="stay-app">
                <StayFilterSort/>
                <StayList stays={stays} />
            </section>
        </div>
    )

}



// const location = useLocation()
    // const searchParams = new URLSearchParams(location.search);
    // let searchTxts = searchParams.get('searchTxt')

    // const history = useHistory()
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loadStays(filterBy))
    //     history.push(`/stay?searchTxt=${filterBy.searchTxt}&type=${filterBy.type}&sortBy=${filterBy.sortBy}`)
    // }, [filterBy])

    // const onSetFilter = (filterBy) => {
    //     history.push(`/stay?searchTxt=${searchTxts}&type=${type}&sortBy=${sortBy}`)
    //     dispatch(setFilter(filterBy))
    //     dispatch(loadStays({...filterBy , type, sortBy}))
    // }
    
    // const { type, sortBy, searchTxt } = filterBy