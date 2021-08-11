export function ReviewsDetails({ review, onOpenReviewModal }) {
    return (
        <div className="review ">
            <div className="review-sender stay-details-pics">
                <img className="host-avatar" src={review.by.imgUrl} alt="" />
                <h2 className="reivew-sender-name">{review.by.fullname}</h2>
            </div>
            <div className="rev-txt">
                <p>{review.txt}</p>
            </div>
        </div>
    )
}