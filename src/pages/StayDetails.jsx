import { connect } from 'react-redux'

import React from 'react';
// import { Link } from 'react-router-dom'
import { removeStay, saveStay, setSelectedStay, /*onAddToCart*/ } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stay.service.js'
import { ReviewsStats } from '../cmps/ReviewsStats'

import { ImgsCarousel } from '../cmps/ImgsCarousel'


// import {StaticDateRangePickerDemo} from '../cmps/AddOrder/DatePicker2.jsx' 


import { StayMap } from '../cmps/StayMap'
import { StayReviews } from '../cmps/StayReviews'
import { AddOrder } from '../cmps/AddOrder/AddOrder.jsx'
// import { Divider } from '@material-ui/core';

import { faWifi, faTv, faSnowflake, faSmoking, faPaw, faUtensils, faBed, faRecycle, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class _StayDetails extends React.Component {

    state = {
        stay: null,
        isEditMode: false
    }


    componentDidMount() {
        // console.log(state.stay)
        this.loadStay()
        // this.props.loadReviews()
    }

    loadStay = () => {
        const { stayId } = this.props.match.params
        stayService.getById(stayId)
            .then(stay => {
                this.setState({ stay })
            })
    }
    handleChange = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState({ stay: { ...this.state.stay, [name]: value } })
    }

    onUpdateStay = () => {
        this.props.updateStay(this.state.stay)
        this.toggleEditMode()
    }


    toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    loadPic = (imgUrls) => {
        for (var i = 0; i < 5; i++) {
            return <img src={imgUrls[i]} alt=""/>
        }
    }
    reviewsAvg = () => {
        const { stay } = this.state
        const avg = stay.reviews.reduce((acc, review) => acc += review.rate, 0) / stay.reviews.length
        return avg.toFixed(1)
    }

    
    // onRemoveStay = () => {
    //     const { removeStay, stayToShow, history } = this.props
    //     removeStay(stayToShow._id)
    //         .then(() => {
    //             history.push('/stay')
    //         })
    // }

    render() {
        // const { user, stayToShow, isLoading, err } = this.props
        const { stay } = this.state
        if (!stay) return <p>Loading...</p>
        return (
            <div className="stay-details flex column">
                <section className="phone-stay-imgs full" hidden>
                <ImgsCarousel imgUrls={stay.imgUrls} />
                </section>
                <p className="details-stay-name">{stay.name}</p>
                <section className="details-stay-info">
                    {stay.reviews?.length && <ReviewsStats reviews={stay.reviews} reviewsAvg={this.reviewsAvg} />}
                    <span className="details-stay-location">{stay.loc.address}</span>
                </section>
                <section className="details-stay-imgs">
                    {stay.imgUrls.map((src, index) => <img src={src} key={index} className="stay-img" alt=""/>)}
                    </section>
                
                <div className="booking-modal-container flex">
                    <div className="booking-details-container">
                        <div className="top-details flex">
                            <div>
                                <h1>{stay.type} hosted by {stay.host.fullname}</h1>
                                <h5>{stay.capacity} guests  · {stay.bedroom} bedroom · {stay.bath} bath</h5>
                            </div>
                            <img className="host-avatar" src={stay.host.imgUrl} alt=""/>
                        </div>
                        <div className="summary">
                            <h1>About us</h1>
                            <p className="sum-span">{stay.summary}</p>
                        </div>
                        <div className="slep-arr-container">
                            <h1>Sleeping arrangements</h1>
                            <div className="slep-arr">
                                <p className="arr-icon"><FontAwesomeIcon icon={faBed} /></p>
                                <p className="arr-icon2">Bedroom {stay.bedroom}</p>
                                <p>{stay.bedroom} double bed</p>
                            </div>

                        </div>
                        <div className="amen-container">

                            <h1 className="amen-title">Amenities</h1>
                            <ul >
                                <div className="amenities">
                                    <li><FontAwesomeIcon icon={faWifi} /><span>Wifi</span>  </li>
                                    <li><FontAwesomeIcon icon={faTv} /> <span>TV</span> </li>
                                    <li><FontAwesomeIcon icon={faSnowflake} /> <span>Air-conditioning</span> </li>
                                    <li><FontAwesomeIcon icon={faSmoking} /> <span>Smoking allowed</span> </li>
                                    <li><FontAwesomeIcon icon={faPaw} /> <span>Pets allowed</span> </li>
                                    <li><FontAwesomeIcon icon={faUtensils} /> <span>Cooking basics</span> </li>
                                    <li><FontAwesomeIcon icon={faRecycle} /> <span>Eco friendly</span> </li>
                                    <li><FontAwesomeIcon icon={faMusic} /> <span>Sound system</span> </li>
                                </div>

                            </ul>
                            {/* {stay.amenities.map(src => <li>{src}</li>)} */}
                        </div>
                        {/* <StaticDateRangePickerDemo/> */}
                    </div>
                    <div className="order-container flex">
                        <div className="order-top flex">
                            <div className="price">
                                <p className="price-num">${stay.price}</p> <p> / night</p>

                            </div>
                            {stay.reviews?.length && <ReviewsStats reviews={stay.reviews} reviewsAvg={this.reviewsAvg} />}
                        </div>
                        <AddOrder stay={stay} />
                    </div>
                </div>
                <hr />
                {stay.reviews?.length &&
                    <div className="reviews">
                        <h2>{stay.reviews?.length && <ReviewsStats reviews={stay.reviews} reviewsAvg={this.reviewsAvg} />}</h2>
                        <div className="reviews-rate">
                            <div className="rev-layout">
                                <div className="rev-stats">
                                    <div className="rev-subj">Cleanliness</div>
                                    <div className="meter-container">
                                        <div className="meter-bcg1"><div className="meter1"></div></div>
                                        <span className="meter-rate">4.8</span>
                                    </div>
                                </div>
                                <div className="rev-stats">
                                    <div className="rev-subj">Communication</div>
                                    <div className="meter-container">
                                    <div className="meter-bcg3"><div className="meter3"></div></div>
                                        <span className="meter-rate">4.6</span>
                                    </div>
                                </div>
                                <div className="rev-stats">
                                    <div className="rev-subj">Check-in</div>
                                    <div className="meter-container">
                                    <div className="meter-bcg3"><div className="meter3"></div></div>
                                        <span className="meter-rate">4.6</span>
                                    </div>
                                </div>
                                <div className="rev-stats">
                                    <div className="rev-subj">Accuracy</div>
                                    <div className="meter-container">
                                    <div className="meter-bcg2"><div className="meter2"></div></div>
                                        <span className="meter-rate">4.7</span>
                                    </div>
                                </div>
                                <div className="rev-stats">
                                    <div className="rev-subj">Location</div>
                                    <div className="meter-container">
                                    <div className="meter-bcg1"><div className="meter1"></div></div>
                                        <span className="meter-rate">4.8</span>
                                    </div>
                                </div>
                                <div className="rev-stats">
                                    <div className="rev-subj">Value</div>
                                    <div className="meter-container">
                                    <div className="meter-bcg2"><div className="meter2"></div></div>
                                        <span className="meter-rate">4.7</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <StayReviews stay={stay} />
                    </div>}
                <div className="map-container">
                    <h1>Loction</h1>
                    <StayMap className=" stay-map" stay={stay} />
                </div>

               
            </div>
        )
    }
}

function mapStateToProps({ stayModule }) {
    return {
        // user: state.appModule.loggedinUser,
        // isLoading: state.stayModule.isLoading,
        // err: state.stayModule.err,
        stays: stayModule.stays,
    }
}
const mapDispatchToProps = {
    removeStay,
    saveStay,
    setSelectedStay,
}
export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)




 {/* <h1>{stay}</h1> */}
                {/* {isLoading && <p>Loading...</p>}
                {err && <p>ERROR: {err}</p>}
                <img src={stayToShow.img} alt="img"/>
                <h2>{stayToShow.name}</h2>
                <p>Price: {stayToShow.price}</p>
                <p>Date Added: {new Date(stayToShow.createdAt).toLocaleDateString("en-GB")}</p>
                <p>Updated date: {new Date(stayToShow.updatedAt).toLocaleDateString("en-GB")}</p>
                <p>{(stayToShow.onStock)?'in Stock' : 'Out of stock'}</p>
                <div className="controler flex space-around">
                    {user && !user.isAdmin && <button>add to Cart</button>}
                    {user && user.isAdmin && 
                    <button onClick={this.onRemoveStay}>remove</button>}
                    {user && user.isAdmin && 
                    <Link to="/stay/edit" onClick={()=> setSelectedStay(stayToShow._id)}>Edit</Link>}
                    <Link to="/stay">Back</Link>
                </div>
                <hr /> */}