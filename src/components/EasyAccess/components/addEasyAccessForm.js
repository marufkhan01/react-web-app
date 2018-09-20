import React, { Component } from 'react'
import axios from 'axios'
import settings from '../../../settings'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { Form, FormGroup, Col, FormControl, Checkbox } from 'react-bootstrap'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

axios.defaults.baseURL = settings.hostname

class AddEasyAccessForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            number: '',
            unlimited_uses: true,
            door: null,
            startDate: moment(),
            endDate: moment().add(1, 'days')
        }

        this.onSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleSubmit(e, lockid) {
        var start = moment(this.state.startDate).toISOString()
        var end = moment(this.state.endDate).toISOString()
        var door_id = this.props.door ? this.props.door.id : null

        if (this.props.allocateDoor) {
            this.props.allocateDoor(lockid, door_id, { target: this.state.number, unlimited_uses: this.state.unlimited_uses, timeframe: { start, end } })
            e.preventDefault()
            return
        }

        onSubmit(lockid, this.state.number, this.state.unlimited_uses, { start, end }, door_id)
        e.preventDefault()
    }

    onChange(e) {
        var state = Object.assign({}, this.state)

        if (e.target.name === "unlimited_uses") {
            state[e.target.name] = !this.state.unlimited_uses
        } else if (e.target.placeholder != "Starttid" && e.target.placeholder != "Sluttid") {
            state[e.target.name] = e.target.value
        }

        this.setState(state)
    }

    handleDateChange(which, date) {
        var state = Object.assign({}, this.state)

        if (which == "start")
            state.startDate = date
        else
            state.endDate = date

        this.setState(state)
    }

    render() {
        const { lock, door } = this.props
        return (
            <Form horizontal onChange={e => this.onChange(e)} onSubmit={e => this.handleSubmit(e, lock._id)}>
                <style>
                    {`.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
            padding-left: 0;
            padding-right: 0; }`}
                </style>
                <FormGroup>
                    <Col sm={12}>
                        <FormControl type="text" name="number" placeholder="Telefonnummer" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={12}>
                        <Checkbox name="unlimited_uses" checked={!this.state.unlimited_uses}>Engångsnyckel</Checkbox>
                    </Col>
                </FormGroup>

                <div style={{ display: this.state.unlimited_uses ? 'inherit' : 'none' }}>

                    Starttid <DatePicker
                        selected={this.state.startDate}
                        onChange={(d) => this.handleDateChange('start', d)}
                        showTimeSelect
                        placeholderText="Starttid"
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        dateFormat="LLL"
                        locale="sv"
                    /><br />
                    Sluttid <DatePicker
                        selected={this.state.endDate}
                        onChange={(d) => this.handleDateChange('end', d)}
                        showTimeSelect
                        placeholderText="Sluttid"
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        dateFormat="LLL"
                        locale="sv"
                    />
                </div>
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
            url: `${settings.consumerhostname}/v2/easyaccess/lock/${params[0]}`,
            data: {
                target: params[1],
                unlimited_uses: params[2],
                timeframe: params[3],
                doorid: params[4]
            }
        }).then(function () {
            swal({
                type: 'success',
                title: 'Framgång!',
                html: 'En gästnyckel till ' + params[1] + ' har skickats.',
                confirmButtonColor: '#006e78'
            })
        }).catch(e => {
            if (!e.response) return
            if (e.response.status == 401) {
                swal({
                    title: '',
                    text: `Vänligen logga in igen`,
                    type: 'error',
                    confirmButtonColor: '#006e78',
                }).then(t => {
                    window.location.href = '/login'
                })
            } else {
                console.log(e.response)
                swal({
                    title: '',
                    text: e.response.data,
                    type: 'error',
                    confirmButtonColor: '#006e78',
                })
            }
        })
    } else {
        swal({
            title: 'Telefonnummer får inte vara tomt!',
            type: 'warning'
        })
    }
}

export default AddEasyAccessForm
