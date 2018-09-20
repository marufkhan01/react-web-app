import axios from 'axios'
import settings from '../../../../settings'


export const removeUser = (access_id, lock_id) => {
  return dispatch => {
    axios
      .delete(`${settings.consumerhostname}/v2/user/lock/${lock_id}/${access_id}`)
      .then(res => {
        dispatch({ type: 'LOADING' })
        dispatch({
          type: 'REMOVE_USER',
          payload: {access_id,lock_id}
        })
      })
      .catch(err => console.log(err))
  }
}
