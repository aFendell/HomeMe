import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/img/airbnb.svg'
import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import LanguageIcon from '@material-ui/icons/Language';
// import {HeaderUserModal} from './HeaderUserModal';
// import Popover from '@material-ui/core/Popover';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { HeaderFilter } from './HeaderFilter';
import SimpleMenu from './SimpleMenu';
import { ReactComponent as AngleLeft } from '../assets/img/icons/angle-left.svg'





class _Header extends Component {
    state = {
        isModalShow: false,
        isHeaderFilterOpen: false,
        show: true,
        scrollPos: 0,
        topPos: 0,
        forFilter: true
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        // console.log(document.body.getBoundingClientRect());
        this.setState({
            scrollPos: document.body.getBoundingClientRect().top,
            show: document.body.getBoundingClientRect().top > this.state.scrollPos,
            forFilter: document.body.getBoundingClientRect().top === this.state.topPos
        });
    };

    openFillter = () => {

        this.setState({ ...this.state, isHeaderFilterOpen: !this.state.isHeaderFilterOpen })
    }

    showModal = (ev) => {
        console.dir(ev)
        // this.setState(this.state.isModalShow = !this.state.isModalShow)
        this.setState({ ...this.state, isModalShow: !this.state.isModalShow })
        // return (<Popover 
        //     anchorOrigin={{
        //       vertical: 'bottom',
        //       horizontal: 'right',
        //     }}
        //     transformOrigin={{
        //       vertical: 'top',
        //       horizontal: 'right',
        //     }}
        //   >
        //     The content of the Popover.
        //   </Popover>)
    }


    render() {
        const { loggedInUser } = this.props
        const { isHeaderFilterOpen } = this.state
        // const { loggedInUser } = this.props;
        return (
            <header className={this.state.forFilter ? "no-bcg flex main-header main-layout" : "active flex main-header main-layout"}>
                <div className="header-expends flex">
                    <div className="nav-container flex space-between">
                        <h1 className="logo-container">
                            <Link to="/"><Logo className="logo" /><span>HomeMe</span></Link>
                        </h1>

                        <div className={this.state.forFilter ? "hidden2" : "search-container"} onClick={this.openFillter}>
                            <input className="navbar-search-btn" placeholder="Start your search" />
                            <span><SearchIcon /></span>

                            {/* <div className="_w64aej" >
                                <button className="_sxfp92z" aria-expanded="false" type="button" data-testid="structured-search-input-search-button">
                                    <div className="_1hb5o3s">
                                        <div className="_14lk9e14">
                                            {/* <SearchIcon/> */}
                            {/* <svg className="_svg-search" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                                                <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="_c5qlo1f">Search</div>
                                    </div>
                                </button>
                            </div> */}

                        </div>

                        <nav className="header-nav flex">
                            <section className="explore">
                                <NavLink className={this.state.forFilter ? "wht" : "blk"} exact to="/stay"><span><AngleLeft /></span> Explore</NavLink>
                            </section>
                            <section className="host">
                                {!loggedInUser?.isHost && <NavLink className={this.state.forFilter ? "wht" : "blk"} to="/login">Become a host</NavLink>}
                                {/* <LanguageIcon /> */}
                            </section>
                            {/* <div onClick={this.showModal} className="avatar-icon">
                            <MenuIcon />
                            {!loggedInUser && <AccountCircleIcon />}
                            {loggedInUser && <img src={loggedInUser.imgUrl} />}
                        </div> */}

                            <section className="user">
                                <SimpleMenu loggedInUser={loggedInUser} />
                            </section>
                        </nav>
                        {/* {isModalShow && <HeaderUserModal/>} */}
                        {/* {isModalShow && <div className="header-modal">
                        <NavLink to="/user">My Profile</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </div>} */}
                    </div> 
                    <div className="main-search-bar">
                    {isHeaderFilterOpen && <HeaderFilter />}    
                    </div>

                        <div className={this.state.forFilter ? "main-search-bar" : "hidden"}>
                            <HeaderFilter />
                        </div>
                </div>
            </header>
        )
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)