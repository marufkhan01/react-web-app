const initialState = {
  loading: false
}

export const fetchUsers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, loading: true }

    case 'SET_USERS_SUCCESS':
      return { ...state, users: action.payload.setUsers, loading: false }

    default:
      return state
  }
}
