import React, { useState } from 'react'
// import { NavLink, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StayAdd } from '../cmps/StayAdd'
import { StayEdit } from '../cmps/StayEdit'
import { UserInbox } from '../cmps/UserInbox'
import { UserStaysList } from '../cmps/UserStaysList'
// import { StayStatistics } from '../cmps/StayStatistics'
import { Header } from '../cmps/Header'


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
        <div className="krapppp">
            <Header />
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
                    {component === 'add' && <StayEdit />}
                    {/* {component === 'add' && <StayAdd />} */}
                    {/* {component === 'Statistics' && <StayStatistics />} */}

                </div>
            </div>
        </div>
    )
}
