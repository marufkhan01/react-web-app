const initialState = {
  isLoading: false,
  locks: [],
  controllers: []
}

export const fetchLocks = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOCKS':
      return { ...state, isLoading: true }

    case 'FETCH_LOCKS_SUCCESS':
      return { ...state, locks: action.payload.setLocks, isLoading: false }

    case 'FETCH_CONTROLLERS':
      return { ...state, isLoading: true }

    case 'FETCH_CONTROLLERS_SUCCESS':
      return {
        ...state,
        controllers: action.payload.setControllers,
        isLoading: false
      }

    case 'FETCH_DELIVERIES':
      return { ...state, isLoading: true }

    case 'FETCH_DELIVERIES_SUCCESS':
      return {
        ...state,
        deliveries: action.payload.setDeliveries,
        isLoading: false
      }

    default:
      return state
  }
}
