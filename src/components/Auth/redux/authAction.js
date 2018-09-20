import axios from 'axios'
import settings from '../../../settings'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt_decode from 'jwt-decode'
import { addFlashMessage } from '../../Flash/flashMessageAction'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

axios.defaults.baseURL = settings.hostname

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  }
}

export const logout = event => {
  return dispatch => {
    localStorage.removeItem('token')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({})) // Empty object for the user
    window.location.href = '/login' // NOTE: Use react router instead
  }
}

export function login(data, props) {
  return dispatch => {
    dispatch({ type: 'LOGIN_IS_LOADING' })
    axios
      .post(`${settings.hostname}/tokens`, data)
      .then(res => {
        const token = res.data
        localStorage.setItem('token', token)
        dispatch({ type: 'LOGIN_SUCCESS', payload: token })
        setAuthorizationToken(token)
        dispatch(setCurrentUser(jwt_decode(token))) // Getting an output when the line below is commented out
        window.location.href = '/' // NOTE: Use react router instead
      })
      .catch(err => {
        swal({
          position: 'top-right',
          type: 'error',
          title: 'Felaktiga inloggningsuppgifter',
          confirmButtonColor: '#006e78',
          showConfirmButton: true,
          allowOutsideClick: true,
          // timer: 2000
        })
      })
  }
}
