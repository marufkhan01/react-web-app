import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import MainNavbar from '../../common/components/navbar'
import store from '../../store'
import { getProperty } from '../../common/utils'
import { fetchData, submitData } from '../../common/redux/CollectionActions'
import './css/profile.css'
import '../AddUser/css/addUser.css'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.admins[0]._id,
      properties: {
        name: this.props.admins[0].name
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
    this.props.submitData(entity, id, obj)
  }

  componentDidMount() {
    this.props.fetchData(["admins"])
  }

  render() {

    console.log(this.props.admins)
    return (
      <div>
        <MainNavbar />
        <hr style={{ borderColor: '#DCDEE0', width: '90%' }} />
        <Grid>
          <Row>
            <Col md={12}>
              {Object.keys(this.state.properties).map(key => {
                return (
                  <div key={key}>
                    <h3 className="text-left settings-sub-title">{getProperty('admin', key).translation}</h3>
                    <div className="input-group">
                      <input
                        name={key}
                        className="change-input form-control"
                        value={this.state.properties[key]}
                        type="text"
                        onChange={(e) => this.onChange(e)}
                      />
                      <Button className="save-settings-btn" type="submit" name={key} onClick={() => this.submitField('admin', this.state.id, key)}>
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
  console.log(state.collectionData.admins[0])
  return {
    admins: state.collectionData.admins
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitData: (collection, id, obj) => dispatch(submitData(collection, id, obj)),
    fetchData: (params) => dispatch(fetchData(params))
  }
}

export default connect(mapState, mapDispatch)(ProfileContainer)
