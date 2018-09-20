import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import '../css/lock.css'
import { getProperty } from '../../../common/utils'
import LockHeaderWithSub from '../../../common/components/LockHeaderWithSub'

class LockSettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.lock._id,
      properties: {
        custom_name: props.lock.custom_name,
        location: props.lock.location,
        street: props.lock.address.street,
        city: props.lock.address.city,
        zip: props.lock.address.zip,
        port_id: props.lock.port_id
      }
    }
    this.onChange = this.onChange.bind(this)
    this.submitField = this.submitField.bind(this)
  }


  onChange(e) {
    var state = Object.assign({}, this.state)
    state.properties[e.target.name] = e.target.value

    this.setState(state)
  }

  submitField(entity, id, key) {
    var obj = {}
    if (key == 'street' || key == 'city' || key == 'zip') {
      obj.address = { street: this.state.properties.street, city: this.state.properties.city, zip: this.state.properties.zip }
    } else {
      obj[key] = this.state.properties[key]
    }
    this.props.submitField(entity, id, obj)
  }

  render() {
    const { lock, qlocxid } = this.props
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={12} className="text-center">
              <LockHeaderWithSub header={lock.address.street} />
              QlocxID: {qlocxid}
            </Col>
          </Row>
        </Grid>
        <hr className="little-hr" width="70%" />
        <Grid>
          <Row className="show-grid">
            <Col md={12} className="text-center">
              {Object.keys(this.state.properties).map(key => {
                return (
                  <div key={key}>
                    <h3 className="text-left settings-sub-title">{getProperty('lock', key).translation}</h3>
                    <div className="input-group">
                      <input
                        name={key}
                        className="change-input form-control"
                        value={this.state.properties[key]}
                        type="text"
                        onChange={(e) => this.onChange(e)}
                      />
                      <Button className="save-settings-btn" type="submit" name={key} onClick={() => this.submitField('lock', this.state.id, key)}>
                        Spara ändring
                   </Button>
                    </div>
                  </div>
                )
              })}
              <Row />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapState = (state, props) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {}
}


export default connect(mapState, mapDispatch)(LockSettingsForm)
