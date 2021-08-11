import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/img/airbnb.svg'
import SearchIcon from '@material-ui/icons/Search';
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
        this.setState({ ...this.state, isModalShow: !this.state.isModalShow })

    }


    render() {
        const { loggedInUser } = this.props
        const { isHeaderFilterOpen } = this.state
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
                        </div>

                        <nav className="header-nav flex">
                            <section className="explore">
                                <NavLink className={this.state.forFilter ? "wht" : "blk"} exact to="/stay"><span><AngleLeft /></span> Explore</NavLink>
                            </section>
                            <section className="host">
                                {!loggedInUser?.isHost && <NavLink className={this.state.forFilter ? "wht" : "blk"} to="/login">Become a host</NavLink>}
                            </section>


                            <section className="user">
                                <SimpleMenu loggedInUser={loggedInUser} />
                            </section>
                        </nav>

                    </div>
                    <div className={this.state.forFilter ? "hidden3" : "main-search-bar"}>
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