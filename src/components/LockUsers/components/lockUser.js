import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Row, Col, Grid } from 'react-bootstrap'
import { removeUser } from '../redux/actions/removeUserAction'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

import '../css/lockUsers.css'

class LockUser extends Component {
  removeUser = () => {
    const userId = this.props.customer.userId
    const lockId = this.props.lock._id
    swal({
      title: 'Vill du verkligen ta bort användaren?',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Avbryt',
      confirmButtonColor: '#006e78',
      confirmButtonText: 'Ja',
      dangerMode: true
    })
      .then(willDelete => {
        if (willDelete) {
          this.props.removeUser(userId, lockId)
          swal({
            title: 'Användare borttagen',
            confirmButtonColor: '#006e78',
            confirmButtonText: 'Ok'
          })
        }
      })
      .catch(e => { })
  }

  showCustomerDetails(customer) {
    swal({
      title: `${customer.name} ${customer.surname}`,
      html: `<p>${customer.email}</p><p>${customer.phone}</p>`,
      confirmButtonColor: '#006e78'
    })
  }

  render() {
    const { lock, customer, access } = this.props

    var component
    switch (customer.level) {
      case -1:
        component = <h5 className="users">{customer.phone}{access.company_name ? ', företag: ' + access.company_name : null}</h5>
        break
      case 0:
        component = (
          <a href="#" onClick={() => this.showCustomerDetails(customer)}>
            <h5 className="users">
              {customer.name} {customer.surname}, {customer.phone}{access.company_name ? ', företag: ' + access.company_name : null}
            </h5>
          </a>
        )
        break
      case 1:
        component = (
          <a href="#" onClick={() => this.showCustomerDetails(customer)}>
            <h5 className="users">
              {customer.name} {customer.surname}, {customer.phone}{access.company_name ? ', företag: ' + access.company_name : null}
            </h5>
          </a>
        )
        break
    }

    return (
      <Grid>
        <Row key={lock._id}>
          <Col style={{ width: '100%' }}>
            <ul className="list">
              <li className="flex-container">
                <div className="flex-item-2">
                  <h5 className="sub-title-text-utl">
                    {component}

                    <button
                      className="remove-user-btn"
                      onClick={() => this.removeUser(customer._id)}
                    >
                      <h5 className="remove-user-text">Ta bort användare</h5>
                    </button>
                  </h5>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(null, { removeUser })(LockUser)
