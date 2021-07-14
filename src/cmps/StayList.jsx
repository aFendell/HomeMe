import { LoadingSpinner } from './LoadingSpinner'
import { StayPreview } from './StayPreview'

export function StayList({stays}) {
    if (!stays) return <LoadingSpinner/>
    return (
        <section className="stay-list">
            {stays.map(stay => <StayPreview key={stay._id}
                stay={stay}/>)}
        </section>
    )
}