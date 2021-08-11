const initialState = {
    err : null,
    isLoading: false,
    stays: [],
    filterBy: { searchTxt: '', type: 'all',sortBy: 'all' },
    selectedStay: null,
    shoppingCart: []
}

export function stayReducer(state = initialState, action={}) {
    switch (action.type) {
        case 'SET_STAYS':
            return { ...state, stays: action.stays, isLoading: false }
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy, isLoading: false }
        case 'STAY_ERR':
            return { ...state, err: action.err, isLoading: false }
        case 'ADD_STAY':
            return { ...state, stays: [...state.stays, action.stay] }
        case 'UPDATE_STAY':
            const idx = state.stays.findIndex(stay => stay._id === action.stay._id)
            state.stays.splice(idx, 1, action.stay)
            return { ...state, stays: [...state.stays] }
        case 'REMOVE_STAY':
            return { ...state, stays: state.stays.filter(stay => stay._id !== action.stayId) }
        case 'LOADING_STAYS':
            return { ...state, isLoading: action.isLoading, err:null }
        case 'SELECT_STAY': 
            return { ...state, selectedStay: action.stay}
        case 'ADD_TO_CART':
            return { ...state, shoppingCart: [...state.shoppingCart, action.item] }
        default:
            return state
    }
}
