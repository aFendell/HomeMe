import { connect } from 'react-redux'

import React from 'react';

import { saveOrder } from '../../store/actions/order.actions.js'
import { socketService } from '../../services/socketService.js';
import TableDatePicker from './DatePicker.jsx'
import { ChecksModal } from './ChecksModal.jsx'
import { GuestsModal } from './GuestsModal'




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
        },
        msg: { txt: '' },
        msgs: [],
        topic: 'Love',
        isBotMode: true
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

    // startNewChat = () => {
    //     socketService.setup()
    //     socketService.emit('chat topic', this.state.order.stay.name)
    //     socketService.on('chat addMsg', this.addMsg)

    //     const from = this.state.order.buyer.fullname || 'MyBot'
    //     socketService.emit('chat newMsg', { from, txt: `You have a new pandding order from ${from}` })
    // }

    // addMsg = newMsg => {
    //     this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }))
    //     if (this.state.isBotMode) this.sendBotResponse();
    // }

    onSaveOrder = (ev) => {
        ev.preventDefault();
        if (this.props.loggedInUser) {
            console.log('savedOrder', this.state.order)
            // this.startNewChat()


            this.setState({ order: { ...this.state.order, startDate: '', endDate: '' }, guests: { adults: 0, kids: 0 } })
        } else {
            return;
        }
        
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
        
        const price = this.props.stay?.price
        const loggedInUser = this.props?.loggedInUser
        const { startDate, endDate, nightCount, totalPrice } = this.state.order
        return (
            <section>
                <form className="trip-form" onSubmit={this.onSaveOrder}>
                    <TableDatePicker setDates={this.setDates} startDate={startDate} endDate={endDate} />
                    <button type="button" className="guests-btn" onClick={this.onOpenGuestsModal}>Guests</button>
                    {this.state.isModalOpen && <GuestsModal setGuests={this.setGuests} closeModal={this.closeModal} />}

                    <button type="button" className="btn-btn-save" onClick={this.onOpenCheckModal} style={{ display: !this.state.isModalCheckOpen ? 'block' : 'none' }}><h2>Check availability</h2></button>
                    {this.state.isModalCheckOpen && <ChecksModal loggedInUser={loggedInUser} price={price} nightCount={nightCount} totalPrice={totalPrice} />}

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
