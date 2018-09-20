import React, { Component } from 'react'
import store from '../../store'
import { connect } from 'react-redux'
import MainNavbar from '../../common/components/navbar'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { submitNewLock } from './redux/actions/AddLockAction'
import { getProperty } from '../../common/utils'

class NewLock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            properties: [
                { name: "lock", parent: null },
                { name: "controller", parent: null },
                { name: "accessid", parent: "controller", required: true },
                { name: "custom_name", parent: "lock" },
                { name: "port_id", type: "number", parent: "lock", required: true },
                { name: "street", parent: "lock" },
                { name: "city", parent: "lock" },
                { name: "zip", parent: "lock" },
                { name: "location", parent: "lock" },
                { name: "open_duration", type: "number", parent: "controller", required: true }
            ],
            form: { lock: {}, controller: {} },
            disableSubmit: true
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(value, item) {
        var state = Object.assign({}, this.state)

        switch (item.type) {
            case "number":
                value = parseInt(value)
                break
        }

        if (item.parent) {
            if (!state.form[item.parent]) state.form[item.parent] = {}

            if (value || value.length > 1 || value >= 0)
                state.form[item.parent][item.name] = value
            else
                state.form[item.parent][item.name] = null

        } else {
            state.form[item.name] = value
        }

        this.setState(state)

        var missing = this.state.properties.filter((item, i) => {
            if (!item.parent) return false
            if (item.required) {
                if (this.state.form[item.parent][item.name] == null) return true
            }
            return false
        })

        if (!missing.length) {
            this.setState(Object.assign({}, this.state, { disableSubmit: false }))
        } else {
            this.setState(Object.assign({}, this.state, { disableSubmit: true }))
        }
    }

    onSubmit() {
        this.props.submitNewLock(this.state.form)
    }


    render() {
        return (
            <div>
                <MainNavbar />
                <Grid>
                    <Row className="show-grid">
                        <Col md={12} className="text-center">
                            <h3>Ny enhet</h3>
                        </Col>
                    </Row>
                </Grid>
                <hr className="little-hr" width="70%" />
                <Grid>
                    <Row className="show-grid">
                        <Col md={12} className="text-center">

                            {this.state.properties.map((item, i) => {
                                switch (item.parent) {
                                    case null:
                                        return (null)
                                        break

                                    default:
                                        return (
                                            <div className="input-group" style={{ marginBottom: '15px' }}>
                                                <input
                                                    name={item.name}
                                                    className="change-input form-control"
                                                    value={this.state.form[item.name]}
                                                    placeholder={getProperty(item.parent, item.name).translation}
                                                    type="text"
                                                    onChange={(e) => this.onChange(e.target.value, item)}
                                                />
                                            </div>)
                                }
                            })}

                            <Button className="save-settings-btn" disabled={this.state.disableSubmit} type="submit" onClick={() => this.onSubmit()}>
                                Spara
                   </Button>
                            <Row />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapState = (state, props) => {
    return {

    }
}

const mapDispatch = (dispatch) => {
    return {
        submitNewLock: (obj) => dispatch(submitNewLock(obj))
    }
}

export default connect(mapState, mapDispatch)(NewLock)











