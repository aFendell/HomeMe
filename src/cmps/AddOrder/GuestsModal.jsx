import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddGuest } from './AddGuest.jsx'



export function GuestsModal(props) {
    // if (!guests || guests?.length) return <div>Loading...</div>
    // console.log('geust', props)
    return (
        <div className="guests-modal">
            <div className="modal-header">
                <FontAwesomeIcon onClick={props.closeModal} className="btn-close" icon={faTimes} />
                <AddGuest setGuests={props.setGuests}/>
            </div>
        </div>
    )
}