import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid, Row, Col } from 'react-bootstrap'
import LockUser from './components/lockUser'
import EasyAccess from '../EasyAccess/components/easy_access'
import { fetchData } from '../../common/redux/CollectionActions'
import MainNavbar from '../../common/components/navbar'
import Loader from '../../common/components/Loader'
import moment from 'moment'
import LockHeaderWithSub from '../../common/components/LockHeaderWithSub'


class LockUsersLayout extends Component {
  componentDidMount() {
    this.props.fetchData(['customers', 'easy_accesses', 'locks'])
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    let locks = this.props.locks || []
    let lock = locks.find(lock => lock._id === this.props.match.params.itemId)

    if (!lock) {
      window.location.replace('/')
    }

    let customers = this.props.customers || []
    let keyedCustomers = _.keyBy(customers, '_id')
    let phonedCustomers = _.keyBy(customers, 'phone')

    let easy_accesses = this.props.easy_accesses.filter(ea => {
      return ea.to_lock == lock._id
    }).map(ea => {
      var cust = phonedCustomers[ea.target]
      if (cust) {
        ea.name = cust.name
        ea.surname = cust.surname
      }
      return ea
    }) || []

    var inactive_easy_accesses = easy_accesses.filter(e => {
      if (!e.unlimited_uses && e.consumed.length > 0) return true
      if (!e.active) return true
      if (e.timeframe.end && moment(e.timeframe.end).isBefore(moment())) return true

      return false
    })

    var active_easy_accesses = []
    for (var e in easy_accesses) {
      if (inactive_easy_accesses.filter(ea => { return easy_accesses[e]._id === ea._id }).length < 1) {
        active_easy_accesses.push(easy_accesses[e])
      }
    }

    let invited_users = lock.users.filter(user => {
      return user.level === -1
    })

    let pending_users = lock.users.filter(user => {
      return user.level === 0
    })

    let active_users = lock.users.filter(user => {
      return user.level === 1
    })

    return (
      <div>
        <MainNavbar />
        <LockHeaderWithSub header={lock.address.street} type={lock.type} />
        <Grid>
          <Row className="show-grid">
            <Col md={5}>
              <h4 className="sub-title-utl">
                Användare ({lock.users.length})
              </h4>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <div>
            {/* <h5>Användare som väntar på svar:</h5>
            {!pending_users.length ? '-' : ''}
            {pending_users.map(user => (
              <LockUser
                lock={lock}
                customer={{
                  ...keyedCustomers[user.customer],
                  timeframe: user.timeframe,
                  userId: user._id,
                  level: user.level
                }}
              />
            ))}
            <br /> */}
            <h5>Aktiva ({active_users.length}):</h5>

            {
              active_users.map((user, i) => (
                <LockUser
                  key={i}
                  lock={lock}
                  customer={{
                    ...keyedCustomers[user.customer],
                    timeframe: user.timeframe,
                    userId: user._id,
                    level: user.level
                  }}
                  access={user}
                />
              ))
            }
            <br />
            <h5>Inbjudna ({invited_users.length}):</h5>
            {invited_users.map((user, i) => (
              <LockUser
                key={i}
                lock={lock}
                customer={{
                  ...keyedCustomers[user.customer],
                  timeframe: user.timeframe,
                  userId: user._id,
                  level: user.level
                }}
                access={user}
              />
            ))}
          </div>
        </Grid>
        <Grid>
          <hr style={{ borderBottom: '1px solid lightgrey' }} />
          <Row className="show-grid">
            <Col md={5}>
              <h4 className="sub-title-utl">
                Gäster ({easy_accesses.length})
              </h4>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <div>
            <h5>Aktiva ({active_easy_accesses.length}):</h5>
            {active_easy_accesses.map((easy_access, i) => {
              return (<EasyAccess key={i} item={easy_access} />)
            })}
            <br />
            <h5>Inaktiva ({inactive_easy_accesses.length}):</h5>
            {inactive_easy_accesses.map((ea, i) => {
              return (<EasyAccess key={i} item={ea} canDelete={false} />)
            })}
          </div>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locks: state.collectionData.locks,
    easy_accesses: state.collectionData.easy_accesses,
    customers: state.collectionData.customers,
    isLoading: state.collectionData.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (params) => dispatch(fetchData(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LockUsersLayout)
