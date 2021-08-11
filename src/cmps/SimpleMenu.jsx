import React, {useState} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/user.actions.js'






export default function SimpleMenu({loggedInUser}) {
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="simple-menu-css">
            <div onClick={handleClick} className="avatar-icon">
                <MenuIcon />
                {!loggedInUser && <AccountCircleIcon />}
                {loggedInUser && <img src={loggedInUser.imgUrl} alt="" />}
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                      
                {!loggedInUser && <MenuItem onClick={handleClose}><Link to="/login">Profile</Link></MenuItem>}
                {loggedInUser && <MenuItem onClick={handleClose}><Link to="/user">Profile</Link></MenuItem>}
               
                <MenuItem onClick={handleClose}><Link to="/about">About Us</Link></MenuItem>
               
                {!loggedInUser && <MenuItem onClick={handleClose}><NavLink to="/login">Login</NavLink></MenuItem>}
                {loggedInUser && <MenuItem onClick={handleClose && onLogout}><NavLink to="/login">Logout</NavLink></MenuItem>}
            </Menu>
        </div>
    );
}