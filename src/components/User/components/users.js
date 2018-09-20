import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

class Users extends Component {
  render() {
    const customer = this.props.customer || []
    return (
      <div>
        <Grid className="grid-center">
          <Row>
            <Col className="text-center" md={12}>
              <div>
                <h3>
                  Namn: {customer.name} {customer.surname}
                </h3>
              </div>
              <div>
                <h3>Email: {customer.email}</h3>
              </div>
              <div>
                <h3>Nummer: {customer.phone}</h3>
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid />
      </div>
    )
  }
}

export default connect()(Users)
