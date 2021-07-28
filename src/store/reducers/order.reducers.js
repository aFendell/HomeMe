const initialState = {
    err: null,
    orders: [],
    isLoading: false,

}

export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                ...state, orders: action.orders, isLoading: false
            }
        case 'ORDER_ERR':
            return {
                ...state, err: action.err, isLoading: false
            }
        case 'ADD_ORDER':
            return {
                ...state, orders: [...state.orders, action.order]
            }

        default:
            return state
    }
}