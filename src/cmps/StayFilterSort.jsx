import { Component } from 'react'
import { TextField } from '@material-ui/core'
// import { faSortAlphaDown, faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class StayFilterSort extends Component {

    state = {
        filterBy: {
            searchTxt: '',
            type: 'all',
            price: 'all',
            sortBy: 'all'
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [name]: value } }, () => {
            const { filterBy } = this.state
            // console.log('filterBy',filterBy)
            this.props.onSetFilter(filterBy)
        })
    }


    render() {
        const { type, sortBy } = this.state
        return (
            <div className="filter-css">
                <h1>Places to stay for you</h1>
                <TextField
                    select
                    name="type"
                    size="small"
                    label="Type"
                    color="secondary"
                    value={type}
                    SelectProps={{ native: true }}
                    variant="outlined"
                    onChange={this.handleChange}
                >
                    <option value="all">All</option>
                    <option value="Caravan">Caravan</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Guesthouse">Guesthouse</option>
                </TextField>
                <TextField
                    select
                    name="sortBy"
                    size="small"
                    label="Sort by"
                    value={sortBy}
                    color="secondary"
                    SelectProps={{ native: true }}

                    id="outlined-basic"
                    variant="outlined"
                    // color="basic"

                    onChange={this.handleChange}
                >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </TextField>

            </div >
        )
    }
}


// ***************  Hooks Attempt  ****************************


// import { Component } from 'react'
// import { TextField } from '@material-ui/core'
// import { faSortAlphaDown, faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useEffect, useState } from "react"


// export const StayFilterSort = ({ onSetFilter }) => {
//     const [fields, setFields] = useState({

//         searchTxt: '',
//         type: 'all',
//         price: 'all',
//         sortBy: 'all'

//     })

//     const handleChange = (ev) => {
//         const field = ev.target.name
//         const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
//         setFields(prevFields => ({ ...prevFields, [field]: value }))
//     }

//     useEffect(() => {
//         onSetFilter(fields)
//     }, [fields])

//     const { searchTxt, type, sortBy, price } = fields
//     return (
//         <div className="filter-css">
//             <h1>Places to stay for you</h1>
//             <TextField
//                 select
//                 name="type"
//                 size="small"
//                 label="Type"
//                 color="secondary"
//                 value={type}
//                 SelectProps={{ native: true }}
//                 variant="outlined"
//                 onChange={handleChange}
//             >
//                 <option value="all">All</option>
//                 <option value="Caravan">Caravan</option>
//                 <option value="Villa">Villa</option>
//                 <option value="Apartment">Apartment</option>
//                 <option value="Guesthouse">Guesthouse</option>
//             </TextField>
//             <TextField
//                 select
//                 name="sortBy"
//                 size="small"
//                 label="Sort by"
//                 value={sortBy}
//                 color="secondary"
//                 SelectProps={{ native: true }}

//                 id="outlined-basic"
//                 variant="outlined"
//                 // color="basic"

//                 onChange={handleChange}
//             >
//                 <option value="name">Name</option>
//                 <option value="price">Price</option>
//             </TextField>

//         </div >
//     )
// }

