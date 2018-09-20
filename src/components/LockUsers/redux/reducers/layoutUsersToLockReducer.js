const initialState = {
  isLoading: false
}

export const fetchUserToLock = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return { ...state, isLoading: true }
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        customers: action.payload.setCustomers,
        isLoading: false
      }

    case 'FETCH_LOCK':
      return { ...state, isLoading: true }
    case 'FETCH_LOCK_SUCCESS':
      return { ...state, locks: action.payload.setLock, isLoading: false }

    default:
      return state
  }
}
