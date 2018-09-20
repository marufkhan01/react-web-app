import axios from 'axios'
import settings from '../../../../settings'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

export function AddReceiver(lock_id, obj) {
    var type = 'ADD_RECEIVER'
    return (dispatch) => {
        dispatch({ type })
        axios.post(`${settings.consumerhostname}/v2/user/lock/${lock_id}`, obj).then(res => {
            dispatch({ type: type + '_SUCCESS', payload: res.data })
            swal({
                type: 'success',
                title: 'Framgång!',
                html: 'Mottagare med nummret ' + obj.phone + ' tillagd.',
                confirmButtonColor: '#006e78'
            })
        }).catch(e => {
            dispatch({ type: type + '_ERROR', payload: e.response.data.message })
        })
    }
}
