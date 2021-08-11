import { connect } from 'react-redux'
import React from 'react';
import { Upload } from './Upload';
import { saveStay } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stay.service';

export class _StayAdd extends React.Component {
    state = {
        stay: {
            name: '',
            type: '',
            imgUrls: [],
            price: '',
            summary: '',
            capacity: '',
            amenities: [],
            host: {
                _id: this.props.loggedinUser._id,
                fullname: this.props.loggedinUser.fullname,
                imgUrl: this.props.loggedinUser.imgUrl,
            },
            loc: {
                address: '',
                lat: '', 
                lng: ''
            }
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ stay: { ...this.state.stay, [name]: value } })
    }

    toggleCheckbox = ({ target }) => {
        const { name, checked } = target
        const { amenities } = this.state.stay
        if (checked === true) amenities.push(name)
        else {
            const idx = amenities.indexOf(name)
            amenities.splice(idx, 1)
        }
        this.setState({ stay: { ...this.state.stay, amenities } })
    }

    getImgUrl = (imgUrl) => {
        console.log('cloudeUrl', imgUrl);
        this.state.stay.imgUrls.push(imgUrl)
    }

    handleAdressChange = ({ target }) => {
        const { name, value } = target
        this.setState({ stay: { ...this.state.stay, loc: { ...this.state.stay.loc, [name]: value } } })
    }

    onGetLoc = async () => {
        const { address } = this.state.stay.loc
        console.log('address', address);
        const res = await stayService.locFromAddress(address)
        console.log(res)
        this.setState({ stay: { ...this.state.stay, loc: { ...this.state.stay.loc, lat: res.lat, lng: res.lng } } })
    }

    onAddStay = async (ev) => {
        ev.preventDefault()
        await this.onGetLoc()
        console.log(this.state.stay);
        this.props.saveStay(this.state.stay)
        this.setState({
            stay: {
                name: '',
                type: '',
                imgUrls: [],
                price: '',
                summary: '',
                capacity: '',
                amenities: [],
                host: {
                },
                loc: {
                }
            }
        })
    }


    render() {
        const { name, loc, type, price, capacity, summary } = this.state.stay
        return (
            <div >
                <form className="add-form" onSubmit={(ev) => this.onAddStay(ev)}>
                    <Upload getImgUrl={this.getImgUrl} />
                    <input type="text" name="name" placeholder="Name"
                        value={name} onChange={this.handleChange} required />
                    <input type="text" name="address" placeholder="Address"
                        value={loc.address} onChange={this.handleAdressChange} />

                    <div className="primary-details">
                        <select name="type" value={type} onChange={this.handleChange} required>
                            <option value="" disabled selected>Listing type</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Entire-House">Entire House</option>
                            <option value="Villa">Villa</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Caravan">Caravan</option>
                            <option value="Hideaway">Hideaway</option>
                        </select>
                        <input className="input-capacity" type="number" placeholder="Capacity"
                            name="capacity" value={capacity} onChange={this.handleChange} />
                        <input className="input-price" type="number" placeholder="Price / night"
                            name="price" value={price} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>Amenities</p>
                        <div className="amenities">
                            <span>
                                <input type="checkbox" name="wifi" checked={null} value={true}
                                    onChange={this.toggleCheckbox} />
                                <label htmlFor="wifi">Wifi</label>
                            </span>
                            <span>
                                <input type="checkbox" name="TV" checked={null} value={true}
                                    onChange={this.toggleCheckbox} />
                                <label htmlFor="TV">TV</label>
                            </span>
                            <span>
                                <input type="checkbox" name="Pool" checked={null} value={true}
                                    onChange={this.toggleCheckbox} />
                                <label htmlFor="Pool">Pool</label>
                            </span>
                            <span>
                                <input type="checkbox" name="Kitchen" checked={null} value={true}
                                    onChange={this.toggleCheckbox} />
                                <label htmlFor="Kitchen">Kitchen</label>
                            </span>
                            <span>
                                <input type="checkbox" name="Air Conditioning" checked={null} value={true}
                                    onChange={this.toggleCheckbox} />
                                <label htmlFor="Air Conditioning">Air Conditioning</label>
                            </span>
                            <span>
                                <input type="checkbox" name="Pets Allowed" checked={null} value={true}
                                    onChange={this.toggleCheckbox} />
                                <label htmlFor="Pets Allowed">Pets Allowed</label>
                            </span>
                        </div>
                    </div>



                    <div className="add-summary">
                        <textarea placeholder="Summary"  name="summary" maxLength="250"
                            value={summary} onChange={this.handleChange}>
                        </textarea>
                    </div>
                    <div className="form-controlls">
                        <button>Save</button>
                        <a href="/">cancel</a>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedinUser: state.appModule.loggedinUser
    }
}
const mapDispatchToProps = {
    saveStay,
}

export const StayAdd = connect(mapStateToProps, mapDispatchToProps)(_StayAdd)