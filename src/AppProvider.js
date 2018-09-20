import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import store from './store'
import Router from './routes/router'
import jwt_decode from 'jwt-decode'
import setAuthorizationToken from './components/Auth/utils/setAuthorizationToken'

import { setCurrentUser } from './components/Auth/redux/authAction'

class AppProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rehydrated: false
    }
  }

  componentWillMount() {
    // persistStore(store, {}, () => {
    if (localStorage.token) {
      setAuthorizationToken(localStorage.token)
      store.dispatch(setCurrentUser(jwt_decode(localStorage.token)))
    }
    this.setState({ rehydrated: true })
    // })
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        <div>
          <h3 style={{ textAlign: 'center' }}>Laddar...</h3>
        </div>
      )
    }
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default AppProvider
