import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
// import '../assets/changePasswordModal.css'

class ChangePasswordModal extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      showModal: true
    }
    this.close = this.close.bind(this)
  }

  close() {
    this.setState({ showModal: false })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <div>
          <Modal
            className="modal-container text-center"
            show={this.state.showModal}
            onHide={this.close}
            animation={true}
            bsSize="small"
          >
            <Modal.Header
              className="change-password-header"
              closeButton
              style={{ borderRadius: '5px' }}
            >
              <Modal.Title className="text-center">
                Ändra ditt lösenord
              </Modal.Title>
            </Modal.Header>

            <form onSubmit={handleSubmit}>
              <div>
                <h5>Nytt lösenord:</h5>
                <div>
                  <Field
                    name="password"
                    component="input"
                    type="password"
                    placeholder="Nytt lösenord"
                  />
                </div>
              </div>
              <div>
                <h5>Repetera ditt lösenord</h5>
                <div>
                  <Field
                    name="repeatPassword"
                    component="input"
                    type="password"
                    placeholder="Repetera lösenord"
                  />
                </div>
              </div>
              <Modal.Footer style={{ textAlign: 'center' }}>
                <Button className="save-password-btn" type="submit">
                  Spara
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'changePasswordForm'
})(ChangePasswordModal)
