// import SearchIcon from '@material-ui/icons/Search';
// import { DatePicker } from './DatePicker'
// import TableDatePicker from './AddOrder/DatePicker.jsx'
import { StayFilterSearch } from './StayFilterSearch.jsx'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

export const HeaderFilter = () => {
    const dispatch = useDispatch()
    const { stays, filterBy } = useSelector(state => state.stayModule)

    useEffect(() => {
        dispatch(loadStays(filterBy))
    }, [filterBy])

    return (
        <form className="_1keztfl" action="/s/all" method="get" role="search">
            <div className="_1sx4f1vv" data-panel-bounds="true">
                <div className="_1c7nvmy">
                    <div className="_1jkbosm7">
                        <div>
                            <div className="_mnnz9u">
                                <label className="_koumzdh">
                                    <div className="_gor68n">
                                        <div className="_1i9tpqw">Location</div>
                                        <StayFilterSearch className="_1xq16jy" onSetFilter={(filterBy) => dispatch(setFilter(filterBy))} />
                                        {/* <input class="_1xq16jy" aria-autocomplete="list" aria-expanded="false" autocomplete="off" autocorrect="off" spellcheck="false" id="bigsearch-query-detached-query" role="combobox" name="query" placeholder="Where are you going?" required="" data-testid="structured-search-input-field-query" value=""></input> */}
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
                                    <div className="_uh2dzp">Add dates</div>
                                    {/* <TableDatePicker setDates={this.setDates} startDate={startDate} endDate={endDate}/> */}
                                </div>
                            </div>
                        </div>
                        <div className="_43mycv"></div>
                        <div className="_j8gg2a">
                            <div role="button" tabIndex="0" className="_1akb2mdw" aria-expanded="false" data-testid="structured-search-input-field-split-dates-1">
                                <div className="_seuyf">
                                    <div className="_wtz1co">Check out</div>
                                    <div className="_uh2dzp">Add dates</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="_43mycv"></div>
                    <div className="_1yulsurh">
                        <div role="button" tabIndex="0" className="_37ivfdq" aria-expanded="false" data-testid="structured-search-input-field-guests-button">
                            <div className="_seuyf">
                                <div className="_wtz1co">Guests</div>
                                <div className="_uh2dzp">Add guests</div>
                            </div>
                        </div>
                        <div className="_w64aej">
                            <button className="_sxfp92z" aria-expanded="false" type="button" data-testid="structured-search-input-search-button">
                                <div className="_1hb5o3s">
                                    <div className="_14lk9e14">
                                        {/* <SearchIcon/> */}
                                        <svg className="_svg-search" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                                            <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="_c5qlo1f">Search</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}