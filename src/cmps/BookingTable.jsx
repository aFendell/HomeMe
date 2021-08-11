import React from 'react';
import { connect } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import {ReactComponent as Envelope} from '../assets/img/icons/envelope-regular.svg'
import {ReactComponent as Phone} from '../assets/img/icons/phone-solid.svg'

class _BookingTable extends React.Component {

    state = {
        ordersToDisplay: []
    }

    async componentDidMount() {
        await this.props.loadOrders()
        const { orders } = this.props
        const ordersToDisplay = orders.filter(order => order.stay._id === this.props.stayId)
        this.setState({ ordersToDisplay })
    }

    getFormatDate = (timstamp) => {
        const date = new Date(timstamp).toLocaleDateString('he-IL')
        return date
    }

    render() {
        const { ordersToDisplay } = this.state
        return (
            <div className="table-container">
                <table >
                    <thead>
                        <tr>

                        <th className="t-name">Guest Name</th>
                        <th className="t-guests">Guests</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersToDisplay.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td className="t-name">{order.buyer.fullname}</td>
                                    <td className="t-guests">{parseInt(order.guests.adults) + parseInt(order.guests.kids)}</td>
                                    <td>{this.getFormatDate(order.startDate)}</td>
                                    <td>{this.getFormatDate(order.endDate)}</td>
                                    <td><Envelope/><Phone/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        orders: state.orderModule.orders,
    }
}
const mapDispatchToProps = {
    loadOrders,
}

export const BookingTable = connect(mapStateToProps, mapDispatchToProps)(_BookingTable)