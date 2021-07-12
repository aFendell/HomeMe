import {ReviewsDetails} from './ReviewsDetails'
export function ReviewsList({reviews, onOpenReviewModal}){
    // console.log(reviews)
    return(
        <div className="review-list flex wrap">
            {reviews.map(review=><ReviewsDetails onOpenReviewModal={onOpenReviewModal} review={review} key={review.id}/>)}
        </div>
    )
}