import React from 'react';
import { Link } from 'react-router-dom'
import newYorkImg from '../assets/img/new-york.jpg'
import rioImg from '../assets/img/rio.jpg'
import sydneyImg from '../assets/img/sydney.jpg'
import { TopList } from '../cmps/TopList';
import { Header } from '../cmps/Header'


export function Home() {
    return (
        <div className="home main-layout.full">
            <Header />
            {/* <h1 className="mb-4">Welcome to HomeME</h1> */}
            <div className="hero main-layout">

                {/* <p>Your new HomeMe</p> */}
                <p className="hero-txt">Home is everywhere</p>

            </div>

            {/* <h3 className="mb-4">
                <Link to="/stay">Explore HomeME</Link>
            </h3> */}
            <div className="home-places main-layout">


                <h1>Popular Destinations</h1>
                <div className="popular-destinations">
                    <Link to="/stay?searchTxt=New+York">
                        <div className="new-york">
                            <img src={newYorkImg} alt="" />
                            <p>New York</p>
                        </div>
                    </Link>
                    <Link to="/stay?searchTxt=Sydney">
                        <div className="sydney">
                            <img src={sydneyImg} alt="" />
                            <p>Sydney</p>
                        </div>
                    </Link>
                    <Link to="/stay?searchTxt=Rio de Janeiro">
                        <div className="rio">
                            <img src={rioImg} alt="" />
                            <p>Rio de Janeiro</p>
                        </div>
                    </Link>
                </div>
                <h1>Top Rated</h1>
                {/* <section> */}
                <TopList />
                {/* </section> */}
                {/* <div className="popular-destinations">
                    <div className="new-york">
                        <img src={newYorkImg} alt="" />
                        <p>New York</p>
                    </div>
                    <div className="sydney">
                        <img src={sydneyImg} alt="" />
                        <p>Sydney</p>
                    </div>
                    <div className="rio">
                        <img src={rioImg} alt="" />
                        <p>Rio de Janeiro</p>
                    </div>
                </div> */}
                <div className="explore-banner">
                    <p>Home is where you'll be</p>
                    <button><Link to="/stay">Explore</Link></button>
                </div>
            </div>
        </div>

    )
}




