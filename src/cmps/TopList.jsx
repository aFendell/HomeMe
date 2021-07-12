import { connect } from 'react-redux'
import React from 'react';
import { loadStays } from '../store/actions/stay.actions.js'
import { StayPreview } from './StayPreview'

class _TopList extends React.Component {

    state = {
        staysToDisplay: []
    }

    async componentDidMount() {
        await this.props.loadStays()
        this.topRated()
    }

    topRated() {
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

            <section className="top-rated">
                {staysToDisplay.map(stay => <StayPreview key={stay._id}
                    stay={stay} />)}
            </section>
        )
    }

}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
    }
}
const mapDispatchToProps = {
    loadStays,
}

export const TopList = connect(mapStateToProps, mapDispatchToProps)(_TopList)