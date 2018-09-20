import axios from 'axios'
import settings from '../../settings'

export function submitConfiguration(obj) {
    return (dispatch) => {
        dispatch({ type: 'SUBMIT_CONFIGURATION' })
        axios.post(`${settings.consumerhostname}/v2/configuration`, obj).then(res => {
            dispatch({ type: 'SUBMIT_CONFIGURATION_SUCCESS', payload: res.data })
        }).catch(e => {
            // console.log(e.response.data)
            // dispatch({ type: 'SUBMIT_CONFIGURATION_ERROR', payload: e.response.data.message })
        })
    }
}
