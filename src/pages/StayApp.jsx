// import { connect } from 'react-redux'
// import React from 'react';
// import { StayList } from '../cmps/StayList'
// import { StayFilterSort } from '../cmps/StayFilterSort.jsx'
// // import { StayFilterSearch } from '../cmps/StayFilterSearch.jsx'
// import { loadStays } from '../store/actions/stay.actions.js'

// class _StayApp extends React.Component {

//     async componentDidMount() {
//         await this.props.loadStays()
//         console.log(this.props)
//     }

//     onSetFilter = (filterBy) => {
//         console.log('Stay app filterBy:', filterBy);
//         this.props.loadStays(filterBy)
//       }
//     render() {
//         const {stays} = this.props
//         return (
//             <section>
//                 <StayFilterSort onSetFilter={this.onSetFilter}/>
//                 {/* <StayFilterSearch onSetFilter={this.onSetFilter}/> */}
//                 <StayList stays={stays} />
//             </section>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         stays: state.stayModule.stays,
//     }
// }
// const mapDispatchToProps = {
//     loadStays,
// }

// export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp)


// ***************  Hooks Attempt  ****************************


import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';
import { StayList } from '../cmps/StayList'
import { StayFilterSort } from '../cmps/StayFilterSort.jsx'
// import { StayFilterSearch } from '../cmps/StayFilterSearch.jsx'
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { Header } from '../cmps/Header'




export const StayApp = () => {

    const dispatch = useDispatch()
    const { stays, filterBy } = useSelector(state => state.stayModule)

    useEffect(() => {
        dispatch(loadStays(filterBy))
    }, [filterBy])

    const onSetFilter = (filterBy) => {
        dispatch(setFilter(filterBy))
    }



    return (
        <div className="appp main-layout">
            <Header/>
            <section className="stay-app">
                {/* <StayFilterSort onSetFilter={(filterBy) => dispatch(loadStays(filterBy))}/> */}
                <StayFilterSort onSetFilter={onSetFilter} />
                <StayList stays={stays} />
            </section>
        </div>
    )

}