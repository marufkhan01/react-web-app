import React, { Component } from 'react'
import store from '../../store'
import { connect } from 'react-redux'
import LockSettingsForm from './components/lockSettingsForm'
import ControllerSettingsForm from './components/controllerSettingsForm'
import { submitData } from '../../common/redux/CollectionActions'
import MainNavbar from '../../common/components/navbar'

class SettingsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lock: {},
      controller: {},
      cluster: {},
      isReady: false
    }
  }


  getLockById = () => {
    if (!store.getState().collectionData.locks) return window.location.replace('/')
    return store
      .getState()
      .collectionData.locks.find(item => item._id === this.props.match.params.itemId)
  }

  getControllerById = controllerId => {
    return store
      .getState()
      .collectionData.controllers.find(item => item._id === controllerId)
  }

  componentDidMount() {

    const lock = this.getLockById()
    if (!lock) {
      window.location.replace('/')
    }
    const controller = this.getControllerById(lock.controller)
    this.setState({
      lock,
      controller,
      isReady: true
    })
  }

  submitField(entity, id, obj) {
    this.props.submitData(entity, id, obj)
  }

  render() {
    const { lock, controller, isReady, isLoading } = this.state

    console.log(this.state)

    if (!isReady) return <p>laddar</p>


    return (
      <div>
        <MainNavbar />
        <LockSettingsForm
          qlocxid={controller ? controller.public_key.substring(0, 8) : ''}
          lock={lock}
          submitField={this.submitField.bind(this)}
        />
        <ControllerSettingsForm
          controller={controller}
          submitField={this.submitField.bind(this)}
        />
      </div>
    )

  }
}

const mapState = (state, props) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {
    submitData: (collection, id, obj) => dispatch(submitData(collection, id, obj))
  }
}

export default connect(mapState, mapDispatch)(SettingsContainer)
