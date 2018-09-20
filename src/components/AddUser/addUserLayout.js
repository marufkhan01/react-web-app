import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from './redux/addUserAction'
import AddUserForm from './components/addUserForm'

class AddUserContainer extends Component {
  submit(values) {
    this.props.addUser(values)
  }

  render() {
    return (
      <div>
        <h1>Bjud in användare</h1>
        <AddUserForm onSubmit={() => this.props.submit()} />
      </div>
    )
  }
}

export default connect(null, { addUser })(AddUserContainer)
