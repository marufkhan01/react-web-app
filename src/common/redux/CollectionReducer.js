import { merge } from 'lodash'

const initialState = {
  isLoading: false,
  filters: {}
}

export const collectionData = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOCKS':
      return { ...state, isLoading: true }

    case 'FETCH_LOCKS_SUCCESS':
      return { ...state, locks: action.payload, isLoading: false }

    case 'FETCH_CUSTOMERS':
      return { ...state, isLoading: true }

    case 'FETCH_EASYACCESSES':
      return { ...state, isLoading: true }

    case 'FETCH_EASYACCESSES_SUCCESS':
      return {
        ...state,
        easy_accesses: action.payload,
        isLoading: false
      }

    case 'FETCH_CUSTOMERS_SUCCESS':
      return {
        ...state,
        customers: action.payload,
        isLoading: false
      }

    case 'FETCH_ADMINS_SUCCESS':
      return {
        ...state, admins: action.payload, isLoading: false
      }

    case 'FETCH_DRIVERS':
      return { ...state, isLoading: true }

    case 'FETCH_DRIVERS_SUCCESS':
      return { ...state, drivers: action.payload, isLoading: false }

    case 'FETCH_CARRIERS':
      return { ...state, isLoading: true }

    case 'FETCH_CARRIERS_SUCCESS':
      return {
        ...state,
        carriers: action.payload,
        isLoading: false
      }

    case 'FETCH_EVENTS':
      return { ...state, isLoading: true }

    case 'FETCH_EVENTS_SUCCESS':
      return { ...state, events: action.payload, isLoading: false }

    case 'FETCH_DELIVERIES':
      return { ...state, isLoading: true }

    case 'FETCH_DELIVERIES_SUCCESS':
      return {
        ...state,
        deliveries: action.payload,
        isLoading: false
      }

    case 'FETCH_CONTROLLERS_SUCCESS':
      return {
        ...state,
        controllers: action.payload,
        isLoading: false
      }

    case 'REMOVE_USER':
      return {
        ...state,
        locks: state.locks.map(lock => {
          return {
            ...lock,
            users: lock.users
              ? lock.users.filter(
                user => user._id !== action.payload.access_id
              )
              : []
          }
        })
      }

    case 'REMOVE_ITEM_SUCCESS':
      return {
        ...state,
        easy_accesses: state.easy_accesses.map(ea => {
          if (ea._id == action.payload._id) ea.active = false
          return ea
        }),
        isLoading: false
      }

    case 'UNALLOCATE_SUCCESS':
      return {
        ...state,
        locks: state.locks.map(lock => {
          if (lock._id == action.payload._id) return action.payload
          return lock
        })
      }

    case 'ALLOCATE_SUCCESS':
      var l = state.locks.map(lock => {
        if (lock._id == action.replace.lock_id) {
          return {
            ...lock, doors: lock.doors.map(door => {
              if (door.id == action.replace.door_id) {
                var cust = state.customers.find(cust => cust.phone == action.payload.target)
                if (cust) action.payload.target = cust
                door.allocation["easy_access"] = action.payload
              }
              return door
            })
          }
        }
        return lock
      })



      return {
        ...state,
        locks: l
      }

    default:
      return state
  }
}
