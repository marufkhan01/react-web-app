import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'
import AddUserButton from '../../../common/components/AddUserButton'
import AddEasyAccessButton from '../../../common/components/AddEasyAccessButton'
import AddReceiverButton from '../../../common/components/AddReceiverButton'
import BrowseClusterButton from '../../../common/components/BrowseClusterButton'
import BrowseClusterDoors from '../../Cluster/BrowseClusterDoors'
import '../css/lock.css'

export default class Lock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true })
    console.log("modal open")
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00'
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    const { lock } = this.props

    var door_type
    switch (lock.type) {
      case 'box':
        door_type = 'Leveransbox'
        break
      case 'room':
        door_type = 'Leveransrum'
        break
      case 'cluster':
        door_type = 'Klusterbox'
        break
      case 'passage':
        door_type = 'Passagedörr'
        break
    }

    if (lock.sub_type) {
      switch (lock.sub_type) {
        case "container":
          door_type = "Container"
          break
      }
    }

    var button1
    var button2 = <AddUserButton lock={lock} />
    switch (lock.type) {
      case "cluster":
        button1 = (<Link to={{ pathname: `/browseclusterdoors/${lock._id}` }}>
          {/* <p className="sub-title-text-container">Se paketlådor</p> */}
          <Button style={{
            fontWeight: 400,
            // width: '150px',
            // marginTop: '10%',
            backgroundColor: '#f1f1f1',
            border: 'none',
            borderRadius: '5px',
            color: 'grey'
          }}>Hantera paketlådor <Glyphicon glyph="glyphicon glyphicon-th" /></Button>
        </Link>)
        break
      default:
        button1 = <AddEasyAccessButton lock={lock} />
        break
    }

    if (lock.sub_type == "container") {
      button1 = <AddReceiverButton lock={lock} />
      button2 = null
    }

    return (
      <div>
        <Grid>
          <Row key={lock._id}>
            <Col style={{ width: '100%' }}>
              <div className="lock-label">
                <p><span style={{ fontSize: '18px' }}>{lock.address.street}</span>,  {lock.custom_name ? lock.custom_name + ' - ' : ''} {door_type}</p>
              </div>

              <ul className="lock-list">
                <li className="lock-flex-container">

                  <div className="lock-flex-item-2" style={{ paddingTop: '2%' }}>
                    {button1}
                  </div>
                  <div className="lock-flex-item-2" style={{ paddingTop: '2%' }}>
                    {button2}
                  </div>
                  <div className="lock-flex-item-2">
                  </div>
                  <div className="lock-flex-item-2">
                  </div>
                  <div className="lock-flex-item-2">
                  </div>
                  <div className="lock-flex-item-2">
                    <Link
                      to={{
                        pathname: `/log/${lock._id}`
                      }}>
                      <p className="sub-title-text-container">Logg</p>
                    </Link>
                  </div>
                  <div className="lock-flex-item-2">
                    <Link
                      to={{
                        pathname: `/tolock/${lock._id}`
                      }}
                    >
                      <p className="sub-title-text-container">Användare</p>
                    </Link>
                  </div>
                  <div className="lock-flex-item-2">
                    <Link to={{ pathname: `/settings/${lock._id}` }}>
                      <p className="sub-title-text-container">Inställningar</p>
                    </Link>
                  </div>
                </li>
              </ul>

            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
