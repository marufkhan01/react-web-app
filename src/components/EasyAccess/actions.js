import axios from 'axios'
import settings from '../../settings'


export const removeEasyAccess = (easyaccess) => {
    return dispatch => {
        dispatch({ type: 'REMOVE_ITEM_LOADING', payload: easyaccess })
        axios
            .delete(`${settings.consumerhostname}/v2/easyaccess/${easyaccess._id}`)
            .then(res => {
                dispatch({
                    type: 'REMOVE_ITEM_SUCCESS',
                    payload: easyaccess
                })
            })
            .catch(err => {
                console.log(err.request)
                dispatch({ type: 'REMOVE_ITEM_FAIL' })
            })
    }
}
