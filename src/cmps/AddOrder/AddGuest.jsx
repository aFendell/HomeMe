import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Component } from 'react';
import { Button } from './Button.jsx'


export class AddGuest extends Component {

    state = {
        guests: {
            adults: 0,
            kids: 0
        }
    }

    incrementCountAdults = (ev) => {
        ev.stopPropagation()
        this.setState({
            adults: { ...this.state.guests.adults++ }
        }, () => {
            this.props.setGuests(this.state.guests)
        });
    };

    decrementCountAdutls = (ev) => {
        ev.stopPropagation()
        if (this.state.guests.adults === 0) return
        this.setState({
            adults: this.state.guests.adults--
        }, () => {
            this.props.setGuests(this.state.guests)
        });
        console.log('adults', this.state.guests.adults)
    };
    incrementCountKids = (ev) => {
        ev.stopPropagation()
        this.setState({
            kids: { ...this.state.guests.kids++ }
        }, () => {
            this.props.setGuests(this.state.guests)
        });
    };

    decrementCountKids = (ev) => {
        ev.stopPropagation()
        if (this.state.guests.kids === 0) return
        this.setState({
            kids: this.state.guests.kids--
        }, () => {
            this.props.setGuests(this.state.guests)
        });
    };





    render() {

        const { adults, kids } = this.state.guests
        return (


            <div className="add-guests-modal">
                <MenuItem name="adults" value={adults}>
                    <p className="guest-title">Adults</p>
                    <Button title={"-"} action={this.decrementCountAdutls} />
                    <span className="p-span left-left">{this.state.guests.adults}</span>
                    <Button title={"+"} action={this.incrementCountAdults} />
                </MenuItem>

                <MenuItem>
                    <p className="guest-title">Kids </p>
                    <Button name="kids" value={kids} title={"-"} action={this.decrementCountKids} />
                    <span min="0" className="p-span left-left">{this.state.guests.kids}</span>
                    <Button title={"+"} action={this.incrementCountKids} />
                </MenuItem>
            </div>


        )
    }
}

