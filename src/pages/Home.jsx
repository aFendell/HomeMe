import React from 'react';
import { Link } from 'react-router-dom'
import newYorkImg from '../assets/img/new-york.jpg'
import rioImg from '../assets/img/rio.jpg'
import sydneyImg from '../assets/img/sydney.jpg'
import { TopList } from '../cmps/TopList';


export function Home() {
    return (
        <div className="home main-layout.full">
          
            <div className="hero main-layout">

                <p className="hero-txt">Home is everywhere</p>

            </div>

            <div className="home-places main-layout">


                <h1>Popular Destinations</h1>
                <div className="popular-destinations">
                    <Link to="/stay?searchTxt=new%20york">
                        <div className="new-york">
                            <img src={newYorkImg} alt="" />
                            <p>New York</p>
                        </div>
                    </Link>
                    <Link to="/stay?searchTxt=sydney">
                        <div className="sydney">
                            <img src={sydneyImg} alt="" />
                            <p>Sydney</p>
                        </div>
                    </Link>
                    <Link to="/stay?searchTxt=rio&type=all&sortBy=all">
                        <div className="rio">
                            <img src={rioImg} alt="" />
                            <p>Rio de Janeiro</p>
                        </div>
                    </Link>
                </div>
                <h1>Top Rated</h1>
                <TopList />
                <div className="explore-banner">
                    <p>Home is where you'll be</p>
                    <button><Link to="/stay">Explore</Link></button>
                </div>
            </div>
        </div>

    )
}




