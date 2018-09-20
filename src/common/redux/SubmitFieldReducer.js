import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const initialState = {
  isLoading: false
}

export const submit = (state = initialState, action) => {
  var t = action.type.split('_')[0]
  if (t === 'SUBMIT') {
    switch (action.type.split('_')[1]) {

      case 'LOCK':
      case 'CONTROLLER':
      case 'ADMIN':
        swal({
          position: 'top-right',
          type: 'success',
          title: 'Sparat',
          showConfirmButton: false,
          timer: 1000
        })

        return { ...state, item: action.payload, isLoading: false }

      default:
        return { ...state }
    }
  } else if (t === 'CREATE') {
    if (action.type === 'CREATE_NEWLOCK_SUCCESS') {
      swal({
        position: 'top-right',
        type: 'success',
        title: 'Ny enhet skapad',
        showConfirmButton: true,
        allowOutsideClick:false
      }).then(function (t) {
        window.location.href = '/'
      })

    }

    if (action.type === 'CREATE_NEWLOCK_ERROR') {
      swal({
        title: '',
        text: `${action.payload}`,
        type: 'error',
        confirmButtonColor: '#006e78',
      })

      console.log(state)
    }
  }

  return { ...state }
}