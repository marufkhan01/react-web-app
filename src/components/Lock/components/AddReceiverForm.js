import React, { Component } from 'react'
import axios from 'axios'
import settings from '../../../settings'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { Form, FormGroup, Col, FormControl, Checkbox } from 'react-bootstrap'
import { AddReceiver } from '../redux/actions/AddReceiverAction'
import { connect } from 'react-redux'

// import moment from 'moment'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

axios.defaults.baseURL = settings.hostname

class AddReceiverForm extends Component {

    constructor(props) {
        super(props)

        this.state = {}

        this.onSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        // this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleSubmit(e, lockid) {
        this.props.submit(lockid, this.state)

        e.preventDefault()
    }

    onChange(e) {
        var state = Object.assign({}, this.state)
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    render() {
        const { lock, door } = this.props
        return (
            <Form horizontal onChange={e => this.onChange(e)} onSubmit={e => this.handleSubmit(e, lock._id)}>
                <FormGroup>
                    <Col sm={12}>
                        <p>Om telefonnumret ej är registrerat till en person så skickar vi ut en inbjudan!</p>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={12}>
                        <FormControl type="text" name="phone" placeholder="Telefonnummer" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={12}>
                        <FormControl type="text" name="company_name" placeholder="Företagsnamn" />
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


const mapState = (state, props) => {
    return {

    }
}

const mapDispatch = (dispatch) => {
    return {
        submit: (lock_id, obj) => dispatch(AddReceiver(lock_id, obj))
    }
}



export default connect(mapState, mapDispatch)(AddReceiverForm)
