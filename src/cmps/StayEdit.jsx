import { connect } from 'react-redux'

import React from 'react';
import { Link } from 'react-router-dom'
import { saveStay, setSelectedStay } from '../store/actions/stay.actions.js'
import { LoadingSpinner } from './LoadingSpinner.jsx';

class _StayEdit extends React.Component {
    state = {
        stay: {
            _id: this.props.stayToShow._id,
            name: this.props.stayToShow.name,
            type: this.props.stayToShow.type,
            price: this.props.stayToShow.price,
            inStock: this.props.stayToShow.inStock,
            createdAt: this.props.stayToShow.createdAt
        }
    }
    componentWillUnmount() {
        //this.props.setSelectedStay()
    }

    onUpdateStay = () => {
        const { saveStay, history } = this.props
        const { stay } = this.state
        saveStay(stay)
            .then(() => {
                history.push('/stay')
            })
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.type === 'number' ? +target.value : target.value
        if(value === "true") value = true;
        else if(value === "false") value = false;
        this.setState({ stay: { ...this.state.stay, [field]: value } })
    }

    render() {
        const { stayToShow, isLoading, err } = this.props
        const { handleChange } = this
        if (!stayToShow) return <LoadingSpinner/>
        return (
            <section className="stay-edit flex column w-75">
                {isLoading && <p>Loading...</p>}
                {err && <p>ERROR: {err}</p>}
                <img src={stayToShow.img} alt="img" />
                <h2>name: <input type="text" name="name" defaultValue={stayToShow.name} onChange={handleChange}/></h2>
                <p>Price: <input type="number" name="price" defaultValue={stayToShow.price} onChange={handleChange} /></p>
                <p>Date Added: {new Date(stayToShow.createdAt).toLocaleDateString("en-GB")}</p>
                <p>Updated date: {new Date(stayToShow.updatedAt).toLocaleDateString("en-GB")}</p>
                <input type="radio" id="inStock" name="inStock" value={true} defaultChecked={this.state.stay.inStock} onChange={handleChange}/>
                <label htmlFor="inStock">in Stock</label>
                <input type="radio" id="outStock" name="inStock" value={false} defaultChecked={!this.state.stay.inStock} onChange={handleChange}/>
                <label htmlFor="outStock">out of Stock</label>
                <div className="controler flex space-around">
                    <button onClick={this.onUpdateStay}>Update!</button>
                    <Link to="/stay">Back</Link>
                </div>
                <hr />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.stayModule.isLoading,
        err: state.stayModule.err,
        stayToShow: state.stayModule.selectedStay,
    }
}
const mapDispatchToProps = {
    saveStay,
    setSelectedStay,
}


export const StayEdit = connect(mapStateToProps, mapDispatchToProps)(_StayEdit)