import axios from 'axios'
import settings from '../../settings'

export const unallocateDoor = (lock_id, allocation_id) => {
    return dispatch => {
        dispatch({ type: 'UNALLOCATE_LOADING', payload: allocation_id })
        axios
            .delete(`${settings.consumerhostname}/v2/allocation/${lock_id}/${allocation_id}`)
            .then(res => {
                dispatch({
                    type: 'UNALLOCATE_SUCCESS',
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err.request)
                dispatch({ type: 'UNALLOCATE_FAIL' })
            })
    }
}

export const allocateDoor = (lock_id, door_id, obj) => {
    console.log(lock_id, obj)
    return dispatch => {
        dispatch({ type: 'ALLOCATE_LOADING', payload: obj })
        axios
            .post(`${settings.consumerhostname}/v2/allocation/${lock_id}/${door_id}`, obj)
            .then(res => {
                dispatch({
                    type: 'ALLOCATE_SUCCESS',
                    payload: res.data,
                    replace: { lock_id, door_id, allocation_type: obj.allocation_type }
                })
            })
            .catch(err => {
                console.log(err.request)
                dispatch({ type: 'ALLOCATE_FAIL' })
            })
    }
}