import React, { useState } from 'react'
// import { NavLink, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StayAdd } from '../cmps/StayAdd'
import { UserInbox } from '../cmps/UserInbox'
import { UserStats } from '../cmps/UserStats'
import { UserStaysList } from '../cmps/UserStaysList'
// import { StayStatistics } from '../cmps/StayStatistics'

export const UserProfile = () => {
    // const {stays} = useSelector(state => state.stayModule)
    const { loggedInUser } = useSelector(state => state.userModule)
    const [component, setComponent] = useState('myStays')

    const handleChange = ({ target }) => {
        const { value } = target
        console.log('value', value);
        setComponent(value)
    }

    return (
        <div className="profile-container">
            <nav className="profile-nav  flex" >
                <button value="myStays" onClick={handleChange}>My Stays</button>
                <button value="inbox" onClick={handleChange}>Inbox</button>
                <button value="add" onClick={handleChange}>Add Listing</button>
            </nav>
            <div className="profile-content">
                <div className="user-card">
                    <h5>{loggedInUser.fullname}</h5>
                    <img className="user-avatar" src={loggedInUser.imgUrl} alt="user" />
                    <h6>Update Photo</h6>
                </div>

                {component === 'inbox' && <UserInbox />}
                {component === 'myStays' && <UserStaysList />}
                {component === 'add' && <StayAdd />}
                {/* {component === 'Statistics' && <StayStatistics />} */}
            </div>
        </div>
    )

}


// class _UserProfile extends React.Component {
//     state = {
//         component: 'myStays'
//     }
//     componentDidMount() {

//     }

//     handleChange = ({ target }) => {
//         const { value } = target
//         console.log('value', value);
//         // this.setState( stay.component: value )
//         this.setState({ component: value })
//         console.log(this.state.component)
//     }

//     render() {
//         const { component } = this.state
//         const { loggedInUser } = this.props
//         return (
//             <div className="profile-container">
//                 <nav className="profile-nav  flex" >
//                     <button value="myStays" onClick={this.handleChange}>My Stays</button>
//                     <button value="inbox" onClick={this.handleChange}>Inbox</button>
//                     <button value="add" onClick={this.handleChange}>Add Listing</button>
//                 </nav>
//                 <div className="profile-content">
//                 <div className="user-card">
//                     <h5>{loggedInUser.fullname}</h5>
//                     <img className="user-avatar" src={loggedInUser.imgUrl} alt="user" />
//                     <h6>Update Photo</h6>
//                 </div>

//                 {component === 'inbox' && <UserInbox />}
//                 {component === 'myStays' && <UserStats />}
//                 {component === 'add' && <StayAdd />}
//                 {/* {component === 'Statistics' && <StayStatistics />} */}
//                 </div>
//             </div>
//         )
//     }

// }

// function mapStateToProps(state) {
//     return {
//         stays: state.stayModule.stays,
//         loggedInUser: state.userModule.loggedInUser,
//     }
// }


// export const UserProfile = connect(mapStateToProps)(_UserProfile)