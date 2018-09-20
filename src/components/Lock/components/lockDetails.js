import React, { Component } from 'react'
import { connect } from 'react-redux'
import LockLog from './lockLog'
import { Grid, Row, Col } from 'react-bootstrap'
import NotFound from '../../../common/components/notFound'
import MainNavbar from '../../../common/components/navbar'
import LockHeaderWithSub from '../../../common/components/LockHeaderWithSub'


class LockDetails extends Component {
  render() {
    const lockId = this.props.match.params.itemId
    const locks = this.props.locks || []
    const events = this.props.events || []
    const lock = locks.find(lock => {
      return lock._id === lockId
    })

    if (!lock) {
      window.location.replace('/')
    }

    return (
      <div>
        <MainNavbar />
        <Grid>
          <Row className="show-grid">
            <Col md={12}>
              <LockHeaderWithSub header={lock.address.street} />
            </Col>
          </Row>
          <hr style={{ borderColor: '#DCDEE0', width: '90%' }} />
          <Row>
            <Col md={12}>
              <LockLog lock={lock} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = state => {
  return {
    locks: state.collectionData.locks
  }
}

export default connect(mapDispatchToProps)(LockDetails)
