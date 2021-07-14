import React from 'react';
import { ReviewsList } from './ReviewsList'
import { ReviewsModal } from './ReviewsModal'
// import { ReviewsStats } from './ReviewsStats'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { LoadingSpinner } from './LoadingSpinner';


export class StayReviews extends React.Component {

    state = {
        stay: null,
        isModalOpen: false,
    }

    targetRef = null;
    targetElement = null;
    

    componentDidMount() {
        // console.log(this.targetRef)
        const {stay} = this.props
        this.setState({ stay },()=>{
            this.targetRef = React.forwardRef(() => <ReviewsModal ref={this.targetRef} reviews={this.state.stay.reviews} reviewsAvg={this.reviewsAvg} closeModal={this.closeModal}/>);
            this.targetElement = this.targetRef.current;
        })
    }
    reviewsAvg = () => {
        const reviews = this.state.stay.reviews
        const avg = reviews.reduce((acc, review) => acc += review.rate, 0) / reviews.length
        return avg.toFixed(2)
    }
    onOpenReviewModal = () => {
        this.setState({...this.state, isModalOpen:true})
        disableBodyScroll(this.targetElement);
        // return <ReviewsModal reviews={stay.reviews} reviewsAvg={reviewsAvg} />
    }
    
    closeModal =()=>{
        this.setState({...this.state, isModalOpen:false})
        enableBodyScroll(this.targetElement);
    }

    componentWillUnmount() {
        clearAllBodyScrollLocks();
      }


    render() {
        const {stay} = this.state
        // console.log(stay)
        if  (!stay) return <LoadingSpinner/>
        return (
            <div className="stay-reviews">
                {/* <ReviewsStats reviews={stay.reviews} reviewsAvg={this.reviewsAvg} /> */}
                <ReviewsList reviews={stay.reviews} onOpenReviewModal={this.onOpenReviewModal}/>
                {this.state.isModalOpen && <ReviewsModal ref={this.targetRef} reviews={stay.reviews} reviewsAvg={this.reviewsAvg} closeModal={this.closeModal}/>}
                <button className="show-all-rev-btn" onClick={this.onOpenReviewModal}>Show all {stay.reviews.length} reviews</button>
                <div className={this.state.isModalOpen ? "overlay active" : "overlay"} id="overlay" onClick={this.closeModal}></div>
            </div>
        )
    }
}

