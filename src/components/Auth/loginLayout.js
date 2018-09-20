import React, { Component } from 'react'
import { login } from './redux/authAction'
import PropTypes from 'prop-types'
import LoginForm from './components/loginForm'
import { connect } from 'react-redux'
import { addFlashMessage } from '../Flash/flashMessageAction'
import FlashMessagesList from '../Flash/flashMessagesList'

class LoginContainer extends Component {
  submit(values) {
    values.email ? this.props.login(values) : null
  }

  render() {
    const { addFlashMessage } = this.props
    return (
      <div className="parent">
        <FlashMessagesList />
        <LoginForm
          onSubmit={this.submit.bind(this)}
          addFlashMessage={addFlashMessage}
        />
      </div>
    )
  }
}

LoginContainer.propTypes = {
  addFlashMessage: PropTypes.bool.isRequired
}

export default connect(null, { addFlashMessage, login })(LoginContainer)
