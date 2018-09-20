import axios from 'axios'
import settings from '../../../settings'

export const setCurrentUser = (phone, id) => {
  return {
    type: 'ADD_NEW_USER',
    payload: {
      phone,
      id
    }
  }
}

export const addUser = (phone, id) => {
  return dispatch => {
    dispatch({ type: 'LOADING' })
    axios
      .post(`${settings.consumerhostname}/customer/addlockuser`, phone)
      .then(res => {
        const body = res.data
        dispatch({ type: 'ADD_SUCCESS', payload: body })
      })
      .catch(err => {
        console.log('ERROR', err)
      })
  }
}
