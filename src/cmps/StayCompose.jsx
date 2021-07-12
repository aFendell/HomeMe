import React from 'react';

export class StayCompose extends React.Component {
    state = {
        stay: {
            name: '',
            type: '',
            price: 0
        }
    }

    inputRef = React.createRef()

    componentDidMount() {


        this.inputRef.current.focus()
    }

    resetNoteCompose = () => {
        this.setState({ stay: { name: '', type: '', price: 0 } })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ stay: { ...this.state.stay, [field]: value } })
    }

    onSaveStay = (ev) => {
        ev.preventDefault()
        const { name, type, price } = this.state.stay
        const stay = { name, price, type, createdAt: new Date(Date.now()), inStock: true }
        this.props.saveStay(stay)
        this.resetNoteCompose()
    }

    render() {
        const { stays } = this.props
        const { name, type, price } = this.state.stay
        const { handleChange, onSaveStay } = this
        const typeOptions = stays.reduce((acc, stay) => {
            if (!acc.includes(stay.type))
                acc.push(stay.type)
            return acc
        }, [])

        return (

            <form onSubmit={onSaveStay}>
                <input type="text" name="name" id="name" ref={this.inputRef} placeholder="Stay Name?"
                    value={name}
                    onChange={handleChange}
                />
                <input type="text" name="type" list="type" placeholder="Funny"
                    value={type}
                    onChange={handleChange}
                />
                <datalist id="type">
                    {typeOptions.map(option => <option key={option}>{option}</option>)}
                </datalist>
                <input type="number" name="price" value={price}
                    onChange={handleChange} />
                <button>Save</button>
            </form>
        )
    }
}

