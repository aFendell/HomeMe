import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';

import { saveStay, setSelectedStay } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stay.service.js';
import { Upload } from './Upload';


export const StayEdit = ({ stayId }) => {
    const [stay, setStay] = useState(stayService.getEmptyStay)
    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        loadStay()
    }, [])

    const loadStay = async () => {
        
        if (stayId) {
            const stayToEdit = setSelectedStay(stayId)
            setStay(stayToEdit)
        } else {
            const host = { _id: loggedInUser._id, fullname: loggedInUser.fullname, imgUrl: loggedInUser.imgUrl }
            setStay(prevStay => ({ ...prevStay, host }))
        }
    }

    const handleChange = ({ target }) => {
        const { name, value } = target
        setStay(prevStay => ({ ...prevStay, [name]: value }))
    }

    const toggleCheckbox = ({ target }) => {
        const { name, checked } = target
        const { amenities } = stay
        if (checked === true) amenities.push(name)
        else {
            const idx = amenities.indexOf(name)
            amenities.splice(idx, 1)
        }
        console.log(amenities);
        setStay(prevStay => ({ ...prevStay, amenities }))
    }

    const getImgUrl = (imgUrl) => {
        console.log('cloudeUrl', imgUrl);
        stay.imgUrls.push(imgUrl)
    }

    const handleAdressChange = ({ target }) => {
        const { name, value } = target
        setStay( prevStay => ({ ...prevStay, loc: { ...stay.loc, [name]: value }} ) )
    }

    const onGetLoc = async () => {
        const { address } = stay.loc
        console.log('address', address);
        const res = await stayService.locFromAddress(address)
        console.log(res.lat)
        setStay(prevStay => ({ ...prevStay, loc: { ...stay.loc, lat: res.lat, lng: res.lng } } ))
    }

    const onAddStay =  (ev) => {
        ev.preventDefault()
        onGetLoc()
        console.log(stay);
        dispatch(saveStay(stay))
        //CLEAN-UP
        setStay(stayService.getEmptyStay())
    }

    const { name, loc, type, price, capacity, summary } = stay
    return (
        <div >
            <form className="add-form" onSubmit={(ev) => onAddStay(ev)}>
                <Upload getImgUrl={getImgUrl} />
                <input type="text" name="name" placeholder="Name"
                    value={name} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address"
                    value={loc.address} onChange={handleAdressChange} />

                <div className="primary-details">
                    <select name="type" value={type} onChange={handleChange} required>
                        <option value="" disabled>Listing type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Entire-House">Entire House</option>
                        <option value="Villa">Villa</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Caravan">Caravan</option>
                        <option value="Hideaway">Hideaway</option>
                    </select>
                    <input className="input-capacity" type="number" placeholder="Capacity"
                        name="capacity" value={capacity} onChange={handleChange} />
                    <input className="input-price" type="number" placeholder="Price / night"
                        name="price" value={price} onChange={handleChange} />
                </div>

                <div>
                    <p>Amenities</p>
                    <div className="amenities">
                        <span>
                            <input type="checkbox" name="wifi" checked={null} value={true}
                                onChange={toggleCheckbox} />
                            <label htmlFor="wifi">Wifi</label>
                        </span>
                        <span>
                            <input type="checkbox" name="TV" checked={null} value={true}
                                onChange={toggleCheckbox} />
                            <label htmlFor="TV">TV</label>
                        </span>
                        <span>
                            <input type="checkbox" name="Pool" checked={null} value={true}
                                onChange={toggleCheckbox} />
                            <label htmlFor="Pool">Pool</label>
                        </span>
                        <span>
                            <input type="checkbox" name="Kitchen" checked={null} value={true}
                                onChange={toggleCheckbox} />
                            <label htmlFor="Kitchen">Kitchen</label>
                        </span>
                        <span>
                            <input type="checkbox" name="Air Conditioning" checked={null} value={true}
                                onChange={toggleCheckbox} />
                            <label htmlFor="Air Conditioning">Air Conditioning</label>
                        </span>
                        <span>
                            <input type="checkbox" name="Pets Allowed" checked={null} value={true}
                                onChange={toggleCheckbox} />
                            <label htmlFor="Pets Allowed">Pets Allowed</label>
                        </span>
                    </div>
                </div>
                <div className="add-summary">
                    <textarea placeholder="Summary" name="summary" maxLength="250"
                        value={summary} onChange={handleChange}>
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