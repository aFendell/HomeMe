import { orderService } from '../../services/orderService.js'


// export function saveOrder(order) { // Action Creator
//     return dispatch => {
//         return orderService.save(order)
//         .then((savedOrder) => {
//             if(!order._id) dispatch({ type: 'ADD_ORDER', order: savedOrder })
//             else dispatch({ type: 'UPDATE_ORDER', order: savedOrder })
//             console.log(savedOrder)
//             })
//     }
// }

export function saveOrder(order) { // Action Creator
    return async dispatch => {
        try {
            const savedOrder = await orderService.save(order)
            const action = {
                type: 'ADD_ORDER',
                order: savedOrder
            }
            dispatch(action)
        } catch (err) {
            console.log('Error in orderActions on save :', err);
        }
    }
}

export function loadOrders() { // Action Creator
    return dispatch => {
        dispatch({ type: 'LOADING_ORDERS', isLoading: true })
        return orderService.query()
            .then(orders => {
                const action = {
                    type: 'SET_ORDERS',
                    orders
                }
                dispatch(action)
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'ORDER_ERR', err })
            })
    }
}