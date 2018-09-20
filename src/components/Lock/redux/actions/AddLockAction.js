import axios from 'axios'
import settings from '../../../../settings'

axios.defaults.baseURL = settings.hostname

export function submitNewLock(obj) {
    return (dispatch) => {
        dispatch({ type: 'CREATE_NEWLOCK' })
        axios.post('/newlock', obj).then(res => {
            dispatch({ type: 'CREATE_NEWLOCK_SUCCESS', payload: res.data })
        }).catch(e => {
            dispatch({ type: 'CREATE_NEWLOCK_ERROR', payload: e.response.data.message })
        })
    }
}
