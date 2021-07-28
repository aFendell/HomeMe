import { stayService } from '../../services/stay.service.js'

export function loadStays(filterBy) { // Action Creator
  return async dispatch => {
    try {
      const stays = await stayService.query(filterBy)
      dispatch({ type: 'SET_STAYS', stays })
    } catch (err) {
      console.log('StaysActions: err in loadStays', err)
      dispatch({ type: 'STAY_ERR', err })
    }
  }
}

export function setFilter(filterBy) {
  return (dispatch) => dispatch({ type: 'SET_FILTER', filterBy })
}


// export function setFilter(filterBy) {
//   return (dispatch) => dispatch(_setFilter(filterBy))
// }

// const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });

export function saveStay(stay) { // Action Creator
  console.log('actions stay:', stay);
  return dispatch => {
    return stayService.save(stay)
      .then((savedStay) => {
        if (!stay._id) dispatch({ type: 'ADD_STAY', stay: savedStay })
        else dispatch({ type: 'UPDATE_STAY', stay: savedStay })
      })
  }
}

export function setSelectedStay(stayId) { // Action Creator
  return dispatch => {
    return stayService.getById(stayId)
      .then((stay) => {
        if (!stay) stay = null
        const action = {
          type: 'SELECT_STAY',
          stay,
        }
        dispatch(action)
      })
  }
}

export function removeStay(stayId) { // Action Creator
  return async dispatch => {
    try {
      await stayService.remove(stayId)
      dispatch({ type: 'REMOVE_STAY', stayId })
    } catch (err) {
      console.log('StaysActions: err in removeStays', err)
      dispatch({ type: 'STAY_ERR', err })
    }
  }
}

export function addStay(stay) {
  return async dispatch => {
    try {
      const addedStay = await stayService.add(stay)
      dispatch({ type: 'ADD_STAY', stay: addedStay })

    } catch (err) {
      console.log('StayActions: err in addStay', err)
    }
  }
}

export function updateStay(stay) {
  return async dispatch => {
    try {
      const updatedStay = await stayService.update(stay)
      dispatch({ type: 'UPDATE_STAY', stay: updatedStay })

    } catch (err) {
      console.log('StayActions: err in updateStay', err)
    }
  }
}