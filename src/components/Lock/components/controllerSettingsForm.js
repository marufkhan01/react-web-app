import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import '../css/lock.css'
import { getProperty } from '../../../common/utils'

class ControllerSettingsForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: props.controller._id,
      properties: {
        open_duration: props.controller.open_duration,
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
    obj[key] = this.state.properties[key]
    this.props.submitField(entity, id, obj)
  }
  

  render() {
    const { controller } = this.props

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={12} className="text-center">
              {Object.keys(this.state.properties).map(key => {
                return (
                  <div key={key}>
                    <h3 className="text-left settings-sub-title">{getProperty('controller', key).translation}</h3>
                    <div className="input-group">
                      <input
                        name={key}
                        className="change-input form-control"
                        value={this.state.properties[key]}
                        type="text"
                        onChange={(e) => this.onChange(e)}
                      />
                      <Button className="save-settings-btn" type="submit" name={key} onClick={() => this.submitField('controller', this.state.id, key)}>
                        Spara ändring
                   </Button>
                    </div>
                  </div>
                )
              })}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapState = (state, props) => {
  return {
    open_duration: props.controller.open_duration
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}


export default connect(mapState, mapDispatch)(ControllerSettingsForm)