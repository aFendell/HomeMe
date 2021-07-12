import { Link } from 'react-router-dom'
import { ImgsCarousel } from './ImgsCarousel'
import { ReviewsStats } from './ReviewsStats'

export function StayPreview({ stay }) {

    function reviewsAvg() {
        const avg = stay.reviews.reduce((acc, review) => acc += review.rate, 0) / stay.reviews.length
        return avg.toFixed(1)
    }

    if (!stay) return <div>Loading...</div>

    return (
        <div className="stay-preview">
            <Link to={'/stay/' + stay._id}>
                <ImgsCarousel imgUrls={stay.imgUrls} />
                <div className="preview-content">

                    {stay.reviews?.length && <ReviewsStats reviews={stay.reviews} reviewsAvg={reviewsAvg} />}
                    <p className="grey">{stay.type} in {stay.loc.address}</p>
                    <p className="name">{stay.name}</p>
                    {/* <p>{stay.summary.substring(0, 32)}...</p> */}
                    {/* <p>{stay.capacity}</p> */}
                    <p><span className="price">${stay.price}</span> / night</p>
                </div>
            </Link>
        </div>
    )
}