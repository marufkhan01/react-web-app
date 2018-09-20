import React, { Component } from 'react'
import axios from 'axios'
import settings from '../../../settings'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { Form, FormGroup, Col, FormControl, Checkbox } from 'react-bootstrap'
import '../css/addUser.css'
// import * as Datetime from 'react-datetime'


class AddUserForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      number: '',
      allow_easyaccess_dist: false
    }

    this.onSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleSubmit(e, lockid) {
    onSubmit(lockid, this.state.number, this.state.allow_easyaccess_dist)
    e.preventDefault()
  }

  onChange(e) {
    var state = Object.assign({}, this.state)

    if (e.target.name === "allow_easyaccess_dist") {
      state[e.target.name] = !this.state.allow_easyaccess_dist
    } else {
      state[e.target.name] = e.target.value
    }

    this.setState(state)
  }

  render() {
    const { lock } = this.props
    return (
      <Form horizontal onChange={e => this.onChange(e)} onSubmit={e => this.handleSubmit(e, lock._id)}>
        <FormGroup>
          <Col sm={12}>
            <FormControl type="text" name="number" placeholder="Telefonnummer" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <Checkbox name="allow_easyaccess_dist" checked={this.state.allow_easyaccess_dist}>Tillåt att dela ut gästnycklar</Checkbox>
          </Col>
        </FormGroup>
        <div className="text-center" style={{ paddingTop: '10px' }}>
          <button className="add-user-btn" type="submit">
            Klar
          </button>
        </div>
      </Form>
    )
  }
}

function onSubmit(...params) {
  if (params[1].length > 0) {
    return axios({
      method: 'post',
      url: `${settings.consumerhostname}/v2/user/lock/${params[0]}/`,
      data: {
        // lockid: params[0],
        phone: params[1],
        allow_easyaccess_dist: params[2],
        // timeframe: params[3]
      }
    }).then(function (phone) {
      swal({
        type: 'success',
        title: 'Framgång!',
        html: 'Användare med nummret ' + params[1] + ' tillagd.',
        confirmButtonColor: '#006e78'
      })
    })
  } else {
    swal({
      title: 'Telefonnummer får inte vara tomt!',
      type: 'warning'
    })
  }
}

export default AddUserForm
