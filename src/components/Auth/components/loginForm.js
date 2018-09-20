import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import ChangePasswordModal from '../../../common/components/changePasswordModal'
import qlocx from '../../../assets/qlocx.png'
import '../css/auth.css'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.toggleModalButton = this.toggleModalButton.bind(this)
  }

  toggleModalButton() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  submit(values) {
    if (values.password === values.repeatPassword) {
    } else {
      alert('Lösenorden matchar inte')
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <img className="login-logo" alt="Qlocx Logo" src={qlocx} />
          <h3 className="login-title text-center">Logga in</h3>
        </div>
        <div className="login-input">
          <Field
            placeholder="Email"
            name="email"
            component="input"
            type="text"
          />
        </div>
        <hr className="hr-login" />
        <div className="login-input">
          <Field
            placeholder="Lösenord"
            name="password"
            component="input"
            type="password"
          />
        </div>
        <hr className="hr-login" />
        <div>
          <a
            className="forgot-password"
            onClick={() => this.toggleModalButton()}
          >
            {/* Glömt lösenordet? */}
          </a>
          {this.state.showModal ? (
            <ChangePasswordModal onSubmit={this.submit.bind(this)} />
          ) : null}
        </div>
        <button className="login-btn" type="submit">
          Logga in
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login'
})(connect(null, null)(LoginForm))
