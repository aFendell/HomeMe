import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { UserStayPreview } from './UserStayPreview'
import { StayStatistics } from './StayStatistics'


export const UserStaysList = () => {
    const { stays } = useSelector(state => state.stayModule)
    const { loggedInUser } = useSelector(state => state.userModule)
    const [staysToDisplay, setStaysToDisplay] = useState([])

    useEffect(() => {
        currentUserStays()
    }, [stays])

    const currentUserStays = () => {
        const staysToDisplay = stays.filter(stay => stay.host._id === loggedInUser._id)
        setStaysToDisplay(staysToDisplay)
    }

    if (!loggedInUser.isHost) return <div>please become a host and publish stay</div>
    return (
        <div className="stays-info">
            <section className="host-chart">
                <StayStatistics />
            </section>
            <section className="user-stays">
                {staysToDisplay.map(stay => <UserStayPreview key={stay._id} stay={stay} />)}
            </section>
        </div>
    )
}

// class _UserStaysList extends React.Component {

//     state = {
//         staysToDisplay: [],
//         loggedInUser: this.props.loggedInUser
//     }

//     async componentDidMount() {
//         console.log("hi")
//         await this.props.loadStays()
//         this.currentUserStays()
//     }

//     currentUserStays = () => {
//         const { stays } = this.props
//         const staysToDisplay = stays.filter(stay => stay.host._id === this.state.loggedInUser._id)
//         this.setState({ staysToDisplay })
//     }

//     render() {
//         const { staysToDisplay, loggedInUser } = this.state
//         if (!staysToDisplay || !loggedInUser) return <LoadingSpinner/>
//         if (!loggedInUser.isHost) return <div>please become a host and publish stay</div>

//         return (
//             <div className="stays-info">
//                 <section className="host-chart">
//                     <StayStatistics />

//                 </section>
//                 <section className="user-stays">
//                     {staysToDisplay.map(stay => <UserStayPreview key={stay._id}
//                         stay={stay} />)}
//                 </section>
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         stays: state.stayModule.stays,
//         loggedInUser: state.userModule.loggedInUser,
//         // orders: state.orderModule.loggedInUser,
//     }
// }
// const mapDispatchToProps = {
//     loadStays,
// }

// export const UserStaysList = connect(mapStateToProps, mapDispatchToProps)(_UserStaysList)