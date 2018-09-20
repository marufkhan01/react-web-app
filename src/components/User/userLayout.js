import React, { Component } from 'react'
import { connect } from 'react-redux'
import Users from './components/users'
import { CircularProgress } from 'material-ui/Progress'

class LayoutUser extends Component {
  render() {
    const userId = this.props.match.params.userId
    const customers = this.props.customers || []
    const customer = customers.find(customer => customer._id === userId)

    if(!customer) {
      window.location.replace('/') // Detta funkar, men sin 'render()' ska vara pure, detta är inte pure... 
    }

    return (
      <div>
        <Users customer={customer} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    customers: state.fetchData.customers,
    isLoading: state.fetchData.isLoading
  }
}

export default connect(mapStateToProps)(LayoutUser)
