import { connect } from 'react-redux'

import React from 'react';

import { saveOrder } from '../../store/actions/order.actions.js'
import TableDatePicker from './DatePicker.jsx'
import { ChecksModal } from './ChecksModal.jsx'
import { GuestsModal } from './GuestsModal'

// import SimpleModal from './SimpleModal.jsx'
// import FaildModal from './FaildModal.jsx'
// import { GroupedSelect } from './AddGuest.jsx'
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';



export class _AddOrder extends React.Component {
    state = {
        isModalOpen: false,
        isModalCheckOpen: false,
        order: {
            hostId: this.props.stay?.host._id,
            createdAt: new Date(Date.now()),
            buyer: {
                _id: (!this.props.loggedInUser) ? '' : this.props.loggedInUser._id,
                fullname: (!this.props.loggedInUser) ? '' : this.props.loggedInUser.fullname,
            },
            startDate: 0,
            endDate: 0,
            nightCount: 0,
            totalPrice: 0,
            guests: {
                adults: 0,
                kids: 0
            },
            stay: {
                _id: this.props.stay?._id,
                name: this.props.stay?.name,
                price: this.props.stay?.price
            },
            status: 'Pending'
        }
    }

    
    componentDidMount() {
        // this.props.saveOrder()
        // console.log('do we det stays', this.props.stay.price)
        
    }

    calcTotalPrice = (nightCount) => {
        const nightPrice = this.props.stay?.price
        const totalPrice = nightPrice * nightCount
        return totalPrice
    }

    getTripTime = (startDate, endDate) => {
        const diff = new Date(endDate).getTime() - new Date(startDate).getTime()
        return diff / 1000 / 60 / 60 / 24
    }

    setDates = (startDate, endDate) => {
        let nightCount = this.getTripTime(startDate, endDate)
        if (nightCount < 0) nightCount = 0
        const totalPrice = this.calcTotalPrice(nightCount)
        this.setState({ order: { ...this.state.order, startDate, endDate, nightCount, totalPrice } })
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === "radio" ? +target.value : target.value;
        this.setState((prevState) => ({
            ...prevState,
            order: {
                ...prevState.order,
                [field]: value,
            },
        }));
    };

    onSaveOrder = (ev) => {
        ev.preventDefault();
        console.log('savedOrder',this.state.order)
        if (this.props.loggedInUser) {

            
            this.props.saveOrder(this.state.order);
            this.setState({ order: { ...this.state.order, startDate: '', endDate: '' } })
            this.setGuests({ order: { ...this.state.order, guests: { adults: 0, kids: 0 } } })
        } else {
            return;
        }
        // console.log(this.state.order)
        // this.props.loadOrders();
        // this.props.history.push('/stay');
    }

    setGuests = (guests) => {
        this.setState({ order: { ...this.state.order, guests } })
    }

    onOpenGuestsModal = (ev) => {
        ev.stopPropagation()
        this.setState({ ...this.state, isModalOpen: true })
    }
    onOpenCheckModal = () => {

        this.setState({ ...this.state, isModalCheckOpen: true })
    }

    closeModal = () => {
        this.setState({ ...this.state, isModalOpen: false })
    }

    render() {
        // const { stays } = this.props
        // const startDate = this.state.stay?.order.startDate
        // const endDate = this.state.stay?.order.endDate
        const price = this.props.stay?.price
        const loggedInUser = this.props?.loggedInUser
        const { startDate, endDate, nightCount, totalPrice } = this.state.order
        return (
            <section>
                <form className="trip-form" onSubmit={this.onSaveOrder}>
                    <TableDatePicker setDates={this.setDates} startDate={startDate} endDate={endDate} />
                    {/* <GroupedSelect setGuests={this.setGuests} /> */}
                    <button type="button" className="guests-btn" onClick={this.onOpenGuestsModal}>Guests</button>
                    {this.state.isModalOpen && <GuestsModal setGuests={this.setGuests} closeModal={this.closeModal} />}
                    {/* <div className={this.state.isModalOpen ? "overlay active" : "overlay"} id="overlay" onClick={this.closeModal}></div> */}

                    <button type="button" className="btn-btn-save" onClick={this.onOpenCheckModal} style={{ display: !this.state.isModalCheckOpen ? 'block' : 'none' }}><h2>Check availability</h2></button>
                    {this.state.isModalCheckOpen && <ChecksModal loggedInUser={loggedInUser} price={price} nightCount={nightCount} totalPrice={totalPrice} />}
                    {/* {console.log(price)} */}

                    {/* <SimpleModal className="btn-btn-save" /> */}
                </form>
            </section>
        )

    }
}

function mapStateToProps(state) {
    return {
        orders: state.orderModule.orders,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    saveOrder,
}

export const AddOrder = connect(mapStateToProps, mapDispatchToProps)(_AddOrder)
