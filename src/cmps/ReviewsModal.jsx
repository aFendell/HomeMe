import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReviewsList } from './ReviewsList'
import { ReviewsStats } from './ReviewsStats'

export function ReviewsModal({ reviews, reviewsAvg, closeModal }) {
    return (
        <div className="reviews-modal">
            <div className="modal-header">
                <FontAwesomeIcon onClick={closeModal} className="btn-close" icon={faTimes} />
                <div className="modal-stats">
                    <ReviewsStats reviews={reviews} reviewsAvg={reviewsAvg} />
                </div>
            </div>
            <div className="modal-main">
                <ReviewsList reviews={reviews} />
            </div>
        </div>
    )
}