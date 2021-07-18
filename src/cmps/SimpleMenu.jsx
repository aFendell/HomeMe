import React from 'react';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions.js'






export default function SimpleMenu({loggedInUser}) {
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);

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
            {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button> */}
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
                      
                <MenuItem onClick={handleClose}><Link to="/user">Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                {!loggedInUser && <MenuItem onClick={handleClose}><NavLink to="/login">Login</NavLink></MenuItem>}
                {loggedInUser && <MenuItem onClick={handleClose, onLogout}><NavLink to="/login">Logout</NavLink></MenuItem>}
            </Menu>
        </div>
    );
}