import { connect } from 'react-redux'
import React from 'react';
import { loadStays, setFilter } from '../store/actions/stay.actions.js'
import { StayPreview } from './StayPreview'

class _TopList extends React.Component {

    state = {
        staysToDisplay: []
    }

    async componentDidMount() {
        await this.props.loadStays(this.props.filterBy)
        this.topReviews()
    }

    topReviews() {
        const { stays } = this.props
        const n = 3

        let staysWithAvg = stays.map(stay => ({
            ...stay, avgRate: stay.reviews.reduce((acc, review) => acc += review.rate, 0) / stay.reviews.length
        }))
        if (n > staysWithAvg.length) {
            return false;
        }
        staysWithAvg = staysWithAvg
            .sort((a, b) => {
                return b.avgRate - a.avgRate
            })
            .slice(0, n)

        this.setState({ staysToDisplay: staysWithAvg })
    }

    render() {
        const { staysToDisplay } = this.state
        if (!staysToDisplay) return <div>Loading...</div>
        // const { stays } = this.props
        // const topRated = this.topReviews
        // console.log(topRated);
        return (

            <div className="top-rated">
                {staysToDisplay.map(stay => <StayPreview key={stay._id}
                    stay={stay} />)}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        filterBy: state.stayModule.filterBy,
    }
}
const mapDispatchToProps = {
    loadStays,
    setFilter
}

export const TopList = connect(mapStateToProps, mapDispatchToProps)(_TopList)