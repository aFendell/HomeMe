import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Component } from 'react';
import { Button } from './Button.jsx'

// import InputLabel from '@material-ui/core/InputLabel';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';



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
            adults: {...this.state.guests.adults++}
        }, () => {
            this.props.setGuests(this.state.guests)
        });
        // console.log('adults', this.state.guests.adults)
    };

    decrementCountAdutls = (ev) => {
        ev.stopPropagation()
        if (this.state.guests.adults === 0) return
        this.setState({
            adults: this.state.guests.adults--
        }, () => {
            this.props.setGuests(this.state.guests)
        });
        // console.log('adults', this.state.guests.adults)
    };
    incrementCountKids = (ev) => {
        ev.stopPropagation()
        this.setState({
            kids: {...this.state.guests.kids++}
        }, () => {
            this.props.setGuests(this.state.guests)
        });
        // console.log('kids', this.state.guests.kids)
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


    // handleChange = ({ target }) => {
    //     const { name } = target
    //     const value = + target.value
    //     console.log(this.props)
    //     console.log('name:', name, ' value:', value);
    //     this.setState({ guests: { ...this.state.guests, [name]: value } }, () => {
    //         this.props.setGuests(this.state.guests)
    //         // console.log('added adults', this.state.guests.adults)
    //         console.log('guests', this.state.guests);
    //     })
    // }


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
                {/* <MenuItem name="infants" value={0}><button onClick={this.down}>-</button>Infants{this.state.count}<button onClick={this.up}>+</button></MenuItem> */}
            </div>


        )
    }
}

// import * as React from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { Component } from 'react';



// export class GroupedSelect extends Component {

//     state = {
//         count: 0,
//         guests: {
//             adults: 0,
//             kids: 0
//         }
//     }
//     up = () => {
//         // ev.preventDefault();
//         this.setState({ ...this.state.guests.adults, adults: +1 })
//         // console.log(this.state.count);
//     }
//     down = () => {
//         this.setState({ ...this.state.count, count: -1 })
//         console.log(this.state.count);
//     }
//     handleChangeAdult = ({ target }) => {
//         const { name } = target
//         const value = + target.value
//         console.log('name:', name, ' value:', value);
//         this.setState({ guests: { ...this.state.guests, [name]: value } }, () => {
//             this.props.setGuests(this.state.guests)
//             // console.log('added adults', this.state.guests.adults)
//             console.log('guests', this.state.guests);
//         })
//     }
//     // handleChangeKids = ({ target }) => {
//     //     const { name } = target
//     //     const value = (name === 'kids') ? +target.value : target.value
//     //     console.log('name:', name, ' value:', value);
//     //     this.setState({ guests: { ...this.props.guests, [name]: value } }, () => {
//     //         this.props.setKids(this.state.guests.kids)
//     //         console.log('added kids', this.state.guests.kids)
//     //     })
//     // }   



//     render() {
//         const { adults, kids } = this.state.guests
//         return (
//             <div className="add-guests">
//                 {/* <form className="add-guests-form"> */}
//                 <p>Adults:</p>
//                 <input type="text" name="adults" placeholder="adults"
//                     value={adults} onChange={this.handleChangeAdult} required />
//                 <p>Kids:</p>
//                 <input type="text" name="kids" placeholder="kids"
//                     value={kids} onChange={this.handleChangeAdult} required />
//                 {/* </form> */}
//             </div >
//         )
//     }
// }





//  <div className="add-guests">
//     <select name="type" value={type} onChange={this.handleChange} required>
//         <option value="" disabled selected>Guests</option>
//                             <option value="Adults">Adults</option>
//                             <option value="Kids">Kids</option>
//     </select>
// </div > 