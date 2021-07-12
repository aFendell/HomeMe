import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export function ReviewsStats({reviews, reviewsAvg}){
    return(
        <div className="reviews-stats">
            <FontAwesomeIcon className="star-icon" icon={faStar} />
                <span><span className="rev-avg">{reviewsAvg()}</span><span className="reviews-count"> ({reviews.length} reviews)</span></span>
            </div>
    )
}