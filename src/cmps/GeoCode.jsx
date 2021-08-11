import React from 'react';
import { stayService } from '../services/stay.service.js'

export class GeoCode extends React.Component {
    state = {
        stay: {
            loc: {
                address: '',
                let: '',
                lng: ''
            }
        }
    }

    handleAdressChange = ({ target }) => {
        const { name, value } = target
        this.setState({ stay: { ...this.state.stay, loc: { ...this.state.stay.loc, [name]: value } } })
    }



    onGetLoc = async (ev) => {
        ev.preventDefault()
        const { address } = this.state.stay.loc
        console.log('address', address);
        const res = await stayService.locFromAddress(address)
        console.log(res)
        this.setState({ stay: { ...this.state.stay, loc: { ...this.state.stay.loc, lat: res.lat, lng: res.lng } } })
    }

    render() {
        const { address } = this.state.stay
        return (
            <form action="loction" onSubmit={(ev) => this.onGetLoc(ev)}>
                <h1>Address form</h1>
                <input type="text" name="address" placeholder="address"
                    value={address} onChange={this.handleChange} />

                <button>Get Address</button>
            </form>
        )
    }
}