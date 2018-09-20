const initialState = {
  removeUser: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'REMOVE_USER':
      return { ...state, customer: action.payload.customerPayload }

    default:
      return state
  }
}
