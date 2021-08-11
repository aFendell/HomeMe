import { connect} from 'react-redux'
import React from 'react';
import { loadStays } from '../store/actions/stay.actions.js'
import { StayPreview } from './StayPreview'
import { LoadingSpinner } from './LoadingSpinner.jsx';

// export const TopList = () => {
//     const dispatch = useDispatch()
//     const { stays, filterBy } = useSelector(state => state.stayModule)
//     const [staysToDisplay, setStaysToDisplay] = useState([])


//     useEffect(() => {
//         dispatch(loadStays(filterBy))
//         topRated()
//     }, [filterBy])

//     // useEffect(() => {
//     //     const loadStay = async () => {
//     //         const { stayId } = match.params
//     //         const stayToShow = await stayService.getById(stayId)
//     //         setStay(stayToShow)
//     //     }

//     //     loadStay()
//     //     // eslint-disable-next-line
//     // }, [match.params.id])

//     const topRated = () => {
//         console.log(stays);
//         const n = 3

//         let topRatedStays = stays.map(stay => ({
//             ...stay, avgRate: stay.reviews.reduce((acc, review) => acc += review.rate, 0) / stay.reviews.length
//         }))
//         if (n > topRatedStays.length) {
//             return false;
//         }
//         topRatedStays = topRatedStays
//             .sort((a, b) => {
//                 return b.avgRate - a.avgRate
//             })
//             .slice(0, n)

//         setStaysToDisplay(topRatedStays)
//     }

//     if (!staysToDisplay) return <LoadingSpinner/>
//     return (
//         <section className="top-rated">
//             {staysToDisplay.map(stay => <StayPreview key={stay._id}
//                 stay={stay} />)}
//         </section>
//     )
// }


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
        if (!staysToDisplay) return <LoadingSpinner/>
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

}

export const TopList = connect(mapStateToProps, mapDispatchToProps)(_TopList)