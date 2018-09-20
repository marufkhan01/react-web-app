import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import EventItem from './Events/components/eventItem'
import _ from 'lodash'
import { fetchData } from '../common/redux/CollectionActions'
import Lock from './Lock/components/Lock'
import moment from 'moment'
import MainNavbar from '../common/components/navbar'
import { Link } from 'react-router-dom'
import { Button, Popover, OverlayTrigger, Glyphicon } from 'react-bootstrap'


class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCount: 10,
      expanded: false
    }
  }

  componentDidMount() {
    this.props.fetchData(["customers", "carriers", "drivers", "admins", "locks", "events", "controllers", "easy_accesses"])
  }

  loadMore() {
    const { showCount } = this.state
    const { events } = this.props
    showCount === 10
      ? this.setState({
        showCount: events.length,
        expanded: true
      })
      : this.setState({ showCount: 10, expanded: false })
  }

  render() {
    var events = this.props.events || []
    const locks = this.props.locks || []
    const customers = this.props.customers || []
    const drivers = this.props.drivers || []
    const carriers = this.props.carriers || []
    const controllers = this.props.controllers || []
    const easy_accesses = this.props.easy_accesses || []

    const keyedCustomers = _.keyBy(customers, '_id')
    const keyedDrivers = _.keyBy(drivers, '_id')
    const keyedLocks = _.keyBy(locks, '_id')
    const keyedControllers = _.keyBy(controllers, '_id')
    const keyedCarriers = _.keyBy(carriers, '_id')

    if (events.isLoading) return <div>Laddar...</div>

    const toggleMore = (
      <div className="text-center">
        <a className="show-more" onClick={() => this.loadMore()}>
          {this.state.expanded ? (
            <span>Visa mindre</span>
          ) : (
              <span>Visa mer</span>
            )}
        </a>
      </div>
    )

    var _eas = _.flatten(easy_accesses.map(ea => {
      return ea.consumed.map(c => {
        return { unit: ea.to_lock, target: ea.target, timestamp: c.timestamp }
      })
    }))

    events = _.concat(events, _eas)

    events = events.sort((a, b) => {
      return moment(b.timestamp).unix() - moment(a.timestamp).unix()
    })

    const all_events = events.map((event, i) => {
      var driver = event.driver ? keyedDrivers[event.driver] : false
      var carrier = driver ? keyedCarriers[driver.carrier] : false
      var customer = event.customer ? keyedCustomers[event.customer] : false
      var lock = keyedLocks[event.unit] ? keyedLocks[event.unit] : false

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
        <MainNavbar />

        <Grid>
          <Row>
            {/* <Col md={4}>
              <Link to={{ pathname: `/newlock` }} className="no-deco">
                <Button className="add-lock-btn" bsSize="small" block><Glyphicon glyph="plus" /> &nbsp; Lägg till ny passage-enhet</Button>
              </Link>
            </Col> */}
            <Col md={4}>
              <Link to={{ pathname: `/newconfiguration` }} className="no-deco">
                <Button className="add-lock-btn" bsSize="small" block><Glyphicon glyph="glyphicon glyphicon-cog" /> &nbsp; Ny enhetskonfiguration</Button>
              </Link>
            </Col>
            <Col>
              {/* <h5>MyQlocx uppdateras för tillfället, flera funktioner är ur drift under tiden.</h5> */}
            </Col>
          </Row>
        </Grid>
        <br />

        <Grid>
          <Row>
            <Col md={3}>
              <h3 className="sub-title">Enheter</h3>
            </Col>
          </Row>
        </Grid>
        <Grid>
          {locks.map((lock, i) => {
            return (
              <Lock key={i} events={events.filter(e => e.unit == lock._id)} lock={lock || { address: {} }} controller={keyedControllers[lock.controller]} />
            )
          })}
        </Grid>

        <Grid>
          <Row className="show-grid">
            <Col md={3}>
              <h3 className="sub-title" style={{ marginTop: '10px' }}>
                Händelser
              </h3>
            </Col>
          </Row>
        </Grid>
        <Grid>{all_events}</Grid>
        {/* <Grid>{toggleMore}</Grid> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    admins: state.collectionData.admins,
    events: state.collectionData.events,
    locks: state.collectionData.locks,
    controllers: state.collectionData.controllers,
    easy_accesses: state.collectionData.easy_accesses,
    customers: state.collectionData.customers,
    drivers: state.collectionData.drivers,
    carriers: state.collectionData.carriers,
    isLoading: state.collectionData.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (params) => dispatch(fetchData(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
