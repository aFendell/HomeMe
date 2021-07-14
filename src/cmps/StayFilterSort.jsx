import { TextField } from '@material-ui/core'
import { useForm } from '../services/customHooks'

export const StayFilterSort = ({ onSetFilter }) => {
    const [filterBy, handleChange] = useForm({
        searchTxt: '',
        price: 'all',
        type: 'all',
        sortBy: 'all'
    }, onSetFilter)

    const { type, sortBy } = filterBy
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
                onChange={handleChange}
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

                onChange={handleChange}
            >
                <option value="name">Name</option>
                <option value="price">Price</option>
            </TextField>

        </div >
    )
}
