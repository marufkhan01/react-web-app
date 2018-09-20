import axios from 'axios'
import settings from '../../settings'
import { getProperty, getCollectionName } from '../utils'
import store from '../../store'

axios.defaults.baseURL = settings.hostname


export function getLock(lockid) {
  // var lock = store.getState().collectionData.locks.find(item => item._id == lockid)
  console.log(store.getState())
  return (dispatch) => {
    dispatch({
      type: 'GET_LOCAL_LOCK_SUCCESS',
      payload: 'lock'
    })
  }
}

const setAdmins = data => {
  return {
    type: 'FETCH_ADMINS_SUCCESS',
    payload: data
  }
}

const setCustomers = data => {
  return {
    type: 'FETCH_CUSTOMERS_SUCCESS',
    payload: data
  }
}

const setDrivers = data => {
  return {
    type: 'FETCH_DRIVERS_SUCCESS',
    payload: data
  }
}

const setLocks = data => {
  return {
    type: 'FETCH_LOCKS_SUCCESS',
    payload: data
  }
}

const setEasyAccesses = data => {
  return {
    type: 'FETCH_EASYACCESSES_SUCCESS',
    payload: data
  }
}

const setEvents = data => {
  return {
    type: 'FETCH_EVENTS_SUCCESS',
    payload: data
  }
}

const setDeliveries = data => {
  return {
    type: 'FETCH_DELIVERIES_SUCCESS',
    payload: data
  }
}

const setCarriers = data => {
  return {
    type: 'FETCH_CARRIERS_SUCCESS',
    payload: data
  }
}

const setControllers = data => {
  return {
    type: 'FETCH_CONTROLLERS_SUCCESS',
    payload: data
  }
}


export function submitData(entity, id, obj) {
  var property = getProperty(entity, Object.keys(obj)[0])
  switch (property.type) {
    case 'number':
      obj[Object.keys(obj)[0]] = parseInt(obj[Object.keys(obj)[0]])
      break
  }

  var collectionName = getCollectionName(entity)

  return (dispatch) => {
    dispatch({ type: `SUBMITTING_${entity.toUpperCase()}` })
    axios
      .put(`${settings.hostname}/${collectionName}/${id}`, obj)
      .then(res => {
        dispatch({
          type: `SUBMIT_${entity.toUpperCase()}_SUCCESSFUL`,
          payload: res.data
        })
      })
      .catch(err => console.log('ERROR:', err.response))
  }
}

var funcDict = {
  'admins': setAdmins,
  'locks': setLocks,
  'customers': setCustomers,
  'drivers': setDrivers,
  'carriers': setCarriers,
  'events': setEvents,
  'deliveries': setDeliveries,
  'controllers': setControllers,
  'easy_accesses': setEasyAccesses,
  'deliveries': setDeliveries
}

export const fetchData = (params, ids) => async dispatch => {
  if (!params || !params.length) return console.log("saknar params i fetchData")

  var query = null
  if (ids && ids.length) {
    query = '?id=' + ids.join('&id=')
  }

  params.forEach(param => {
    dispatch({ type: `FETCH_${param.toUpperCase()}` })
    var url = `${settings.hostname}/${param}` + (query ? `/${query}` : '')
    axios.get(url).then(t => {
      dispatch(funcDict[param](t.data))
    })
  })
}