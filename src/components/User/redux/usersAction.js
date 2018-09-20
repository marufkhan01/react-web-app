import axios from 'axios'
import settings from '../../../settings'

axios.defaults.baseURL = settings.hostname

export const setUsers = data => {
  return {
    type: 'SET_USERS',
    payload: {
      setUsers: data
    }
  }
}

export const usersFetchData = () => async dispatch => {
  try {
    dispatch({ type: 'SET_USERS' })
    const { customers } = await axios.get(`${settings.hostname}/customers`)
    dispatch({ type: 'SET_USERS_SUCCESS', payload: customers })
  } catch (e) {
    throw new Error('Ojsan')
  }
}
