const initialState = {
  newUser: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'INVITE_NEW_USER':
      return {
        newUser: action.newUser
      }
    default:
      return state
  }
}
