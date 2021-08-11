import SimpleModal from './SimpleModal.jsx'



export function ChecksModal({price, nightCount, totalPrice, loggedInUser}) {
    return (
        <div className="guests-modal">
            <div className="checks-modal-header">
                <SimpleModal loggedInUser={loggedInUser}/>
                <p>You won't get charged yet</p>
                <div className="price-calc flex space-between">
                    <span className="underline">${price} X {nightCount} nights</span>
                    <span>${totalPrice}</span>
                </div>
                <div className="service-fee flex space-between">
                    <span className="underline">Service fee</span>
                    <span>$10</span>
                </div>
                <div className="total-price flex space-between">
                    <span>Total</span>
                    <span>${totalPrice + 10}</span>
                </div>
            </div>
        </div>
    )
}