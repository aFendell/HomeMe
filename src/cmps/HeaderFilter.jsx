// import SearchIcon from '@material-ui/icons/Search';
// import { DatePicker } from './DatePicker'
import { AddOrder } from './AddOrder/AddOrder'
import { StayFilterSearch } from './StayFilterSearch.jsx'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { GuestsModal } from './AddOrder/GuestsModal.jsx'



import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const HeaderFilter = () => {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const searchTxt = searchParams.get('searchTxt')
    // const searchAll = searchParams.getAll('searchTxt')
    // console.log('searchAll', searchAll)
    // console.log('searchTxt', searchTxt)

    const dispatch = useDispatch()
    const history = useHistory()

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [open, setOpen] = useState(false);

    const [guests, setGuests] = useState({})

    const handleOpen = () => {

        // setOpen(prevOpen => ({...prevOpen, open: true }));
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };
    // const [localFilter, setLocalFilter] = useState(initialState)
    const { filterBy, stay } = useSelector(state => state.stayModule)
    
    useEffect(() => {
        if (searchTxt) {
            console.log('update the filter');
            
        } 
        dispatch(loadStays(filterBy))
    }, [filterBy])

    const onSubmitSearch = (ev) => {
        ev.preventDefault()
        history.push(`/stay?searchTxt=${filterBy.searchTxt}&type=${filterBy.type}&sortBy=${filterBy.sortBy}`)
        dispatch(setFilter(filterBy => ({...filterBy, searchTxt})))
        // console.log('submit search', filterBy);
    }

    const onSetFilter = (filterBy) => {
        console.log('filter:', filterBy);
        dispatch(setFilter(filterBy))
    }

    return (
        // <form className="_1keztfl" action="/s/all" method="get" role="search">
        <form className="_1keztfl" role="search">
            <div className="_1sx4f1vv" data-panel-bounds="true">
                <div className="_1c7nvmy">
                    <div className="_1jkbosm7">
                        <div>
                            <div className="_mnnz9u">
                                <label className="_koumzdh">
                                    <div className="_gor68n">
                                        <div className="_1i9tpqw">Location</div>
                                        <StayFilterSearch className="_1xq16jy" onSetFilter={onSetFilter} />
                                    </div>
                                </label>
                                <span id="Koan-query__description" className="_krjbj">Navigate forward to access suggested results</span>
                                <span aria-atomic="true" aria-live="polite" role="status" className="_krjbj"></span>
                            </div>
                        </div>
                    </div>
                    <div className="_43mycv"></div>
                    <div className="_1l6jpwo">
                        <div className="_j8gg2a">
                            <div role="button" tabIndex="0" className="_1akb2mdw" aria-expanded="false" data-testid="structured-search-input-field-split-dates-0">
                                <div className="_seuyf">
                                    <div className="_wtz1co">Check in</div>
                                    <DatePicker
                                        className="_uh2dzp start-date"
                                        placeholderText="Add dates"
                                        selected={startDate}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={(date) => {
                                            setStartDate(date)
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="_43mycv"></div>
                        <div className="_j8gg2a">
                            <div role="button" tabIndex="0" className="_1akb2mdw" aria-expanded="false" data-testid="structured-search-input-field-split-dates-1">
                                <div className="_seuyf">
                                    <div className="_wtz1co">Check out</div>
                                    <DatePicker
                                        className="_uh2dzp end-date "
                                        placeholderText="Add dates"
                                        selected={endDate}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        onChange={(date) => {
                                            setEndDate(date)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="_43mycv"></div>
                    <div className="_1yulsurh">
                        <div role="button" tabIndex="0" className="_37ivfdq" aria-expanded="false" data-testid="structured-search-input-field-guests-button">
                            <div className="_seuyf">
                                <div className="_wtz1co">Guests</div>
                                <div type="button" className="_uh2dzp" onClick={handleOpen}>Add guests</div>
                                {open && <GuestsModal setGuests={setGuests} closeModal={closeModal} />}
                                {/* <div className="_uh2dzp">Add guests</div> */}
                            </div>
                        </div>
                        <div className="_w64aej">
                            <button onClick={onSubmitSearch} className="_sxfp92z" aria-expanded="false" type="button" data-testid="structured-search-input-search-button">
                                <div className="_1hb5o3s">
                                    <div className="_14lk9e14">
                                        <svg className="_svg-search" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                                            <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="_c5qlo1f" >Search</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}



// <div className="_1keztfl" action="/s/all" method="get" role="search">
        //     <div className="_1sx4f1vv" data-panel-bounds="true">
        //         <div className="_1c7nvmy">
        //             <div className="_1jkbosm7">
        //                 <div>
        //                     <div className="_mnnz9u">
        //                         <label className="_koumzdh">
        //                             <div className="_gor68n">
        //                                 <div className="_1i9tpqw">Location</div>
        //                                 <StayFilterSearch className="_1xq16jy" onSetFilter={(filterBy) => dispatch(setFilter(filterBy))} />
        //                             </div>
        //                         </label>
        //                         <span id="Koan-query__description" className="_krjbj">Navigate forward to access suggested results</span>
        //                         <span aria-atomic="true" aria-live="polite" role="status" className="_krjbj"></span>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="_43mycv"></div>
        //             <div className="_1l6jpwo">
        //                 <div className="_j8gg2a">
        //                     <div role="button" tabIndex="0" className="_1akb2mdw" aria-expanded="false" data-testid="structured-search-input-field-split-dates-0">
        //                         <div className="_seuyf">
        //                             <nav className="checks flex">
        //                                 <div className="_wtz1co">Check in</div>

        //                                 <div className="_wtz1co2">Check out</div>
        //                             </nav>
        //                             <div className="home-order flex space-between">
        //                             <AddOrder stay={stay} />
        //                             </div>
        //                             </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="_43mycv"></div>
        //             <div className="_1yulsurh">
        //                 <div role="button" tabIndex="0" className="_37ivfdq" aria-expanded="false" data-testid="structured-search-input-field-guests-button">
        //                     <div className="_seuyf">
        //                         <div className="_wtz1co">Guests</div>
        //                         <div className="_uh2dzp">Add guests</div>
        //                     </div>
        //                 </div>
        //                 <div className="_w64aej">
        //                     <button className="_sxfp92z" aria-expanded="false" data-testid="structured-search-input-search-button">
        //                         <div className="_1hb5o3s">
        //                             <div className="_14lk9e14">
        //                                 <svg className="_svg-search" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
        //                                     <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
        //                                     </g>
        //                                 </svg>
        //                             </div>
        //                             <div className="_c5qlo1f">Search</div>
        //                         </div>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>