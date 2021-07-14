import { Link } from 'react-router-dom'
import { BookingTable } from './BookingTable.jsx'
import { LoadingSpinner } from './LoadingSpinner.jsx'
// import { ImgsCarousel } from './ImgsCarousel'
// import { ReviewsStats } from './ReviewsStats'

export function UserStayPreview({ stay }) {

    // function reviewsAvg() {
    //     const avg = stay.reviews.reduce((acc, review) => acc += review.rate, 0) / stay.reviews.length
    //     return avg.toFixed(1)
    // }

    if (!stay) return <LoadingSpinner />

    return (
        <div className="user-stay-preview">
            <div className="user-stay-header">
                <p><span className="medium">Name: </span>{stay.name}</p>
                <p><span className="medium">Type: </span>{stay.type} in {stay.loc.address}</p>
            </div>
            <div className="user-stay-content">
                <Link to={'/stay/' + stay._id}>
                    <img src={stay.imgUrls[0]} alt="stay img" />
                </Link>
                <BookingTable stayId={stay._id} />
            </div>
        </div>
    )
}