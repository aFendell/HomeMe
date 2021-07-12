import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReviewsList } from './ReviewsList'
import { ReviewsStats } from './ReviewsStats'

export function ReviewsModal({ reviews, reviewsAvg, closeModal }) {
    // if (!reviews || reviews?.length) return <div>Loading...</div>
    return (
        <div className="reviews-modal">
            <div className="modal-header">
                <FontAwesomeIcon onClick={closeModal} className="btn-close" icon={faTimes} />
                <div className="modal-stats">
                    <ReviewsStats reviews={reviews} reviewsAvg={reviewsAvg} />
                    <input type="text" placeholder="Search reviews" />
                </div>
            </div>
            <div className="modal-main">
                <ReviewsList reviews={reviews} />
            </div>
        </div>
    )
}