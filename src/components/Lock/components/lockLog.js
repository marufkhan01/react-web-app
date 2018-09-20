import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import EventItem from '../../Events/components/eventItem'
import { keyBy } from 'lodash'
import { fetchData } from '../../../common/redux/CollectionActions'
import _ from 'lodash'
import moment from 'moment'


class LockLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCount: 4,
      expanded: false
    }
  }

  componentDidMount() {
    this.props.fetchData(['events'])
  }

  render() {
    const { lock, customers, drivers, carriers, events, easy_accesses } = this.props || []
    const keyedCustomers = keyBy(customers, '_id')
    const keyedDrivers = keyBy(drivers, '_id')
    const keyedCarriers = keyBy(carriers, '_id')

    var _eas = _.flatten(easy_accesses.map(ea => {
      return ea.consumed.map(c => {
        return { unit: ea.to_lock, target: ea.target, timestamp: c.timestamp }
      })
    }))

    var _events = _.concat(events, _eas).sort((a, b) => {
      return moment(b.timestamp).unix() - moment(a.timestamp).unix()
    })

    const eevents = _events.filter(e => { return e.unit == lock._id })

    const mappedEvents = eevents.map((event, i) => {
      var driver = event.driver ? keyedDrivers[event.driver] : false
      var carrier = driver ? keyedCarriers[driver.carrier] : false
      var customer = event.customer ? keyedCustomers[event.customer] : false

      return (
        <EventItem
          key={i}
          event={event}
          customer={customer}
          carrier={carrier}
          driver={driver}
          easy_access={event.target ? event : null}
          lock={lock || { address: {} }}
        />
      )
    })

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={3}>
              <h3 className="sub-title" style={{ marginTop: '10px' }}>
                Händelser
              </h3>
            </Col>
          </Row>
        </Grid>
        <Grid>{mappedEvents.length ? mappedEvents : 'Inga händelser'}</Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.collectionData.events,
    customers: state.collectionData.customers,
    drivers: state.collectionData.drivers,
    carriers: state.collectionData.carriers,
    easy_accesses: state.collectionData.easy_accesses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (params) => dispatch(fetchData(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LockLog)
