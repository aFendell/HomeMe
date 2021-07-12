// import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export function ReviewsDetails({ review ,onOpenReviewModal}) {
    return (
        <div className="review ">
            <div className="review-sender stay-details-pics">
                <img className="host-avatar" src={review.by.imgUrl} />
                <h2 className="reivew-sender-name">{review.by.fullname}</h2>
            </div>
            <div className="rev-txt">
                <p>{review.txt}</p>
            </div>
            {/* <div className="show-more">
                <button className="show-more-btn" onClick={onOpenReviewModal}>Show more</button>
                <FontAwesomeIcon className="arrow-icon" icon={faChevronRight} />
            </div> */}
        </div>
    )
}