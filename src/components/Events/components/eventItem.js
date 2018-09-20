import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import moment from 'moment'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

import '../css/events.css'

export default class EventItem extends Component {
  showCustomerDetails(customer) {
    swal({
      title: `${customer.name} ${customer.surname}`,
      html: `<p>${customer.email}</p><p>${customer.phone}</p>`,
      confirmButtonColor: '#006e78'
    })
  }
  showDriverDetails(driver, carrier) {
    swal({
      title: `${driver.name} ${driver.surname ? driver.surname : ''}`,
      html: `<p>Speditör: ${carrier.organization}</p>`,
      confirmButtonColor: '#006e78'
    })
  }

  doorType(type,sub_type) {

    if(sub_type){
      switch(sub_type){
        case "container":
        return "containern"
      }
    }

    switch (type) {
      case 'box':
        return 'leveransboxen'
        break
      case 'room':
        return 'leveransrummet'
        break
      case 'cluster':
        return 'paketboxen'
        break
      case 'passage':
        return 'passagedörren'
        break
    }
  }

  createEasyAccess(lock, easy_access) {
    return (<div>
     
       Gäst {easy_access.target}
   
       &nbsp;öppnade {this.doorType(lock.type,lock.sub_type)}{lock.custom_name ? ` (${lock.custom_name})` : ''} på {lock.address.street}
    </div>)
  }

  createCustomerRow(lock, customer) {
    if(!lock || !lock.users) return (null)

    var access = lock.users.find(user => user.customer == customer._id)
    return (<div>
      <a href="#"
        className="event-item-link"
        onClick={() => this.showCustomerDetails(customer)}
      >
        {customer.name} {customer.surname}{access && access.company_name ? `, företag: ${access.company_name} `: null}
      </a>
      &nbsp;öppnade {this.doorType(lock.type,lock.sub_type)}{lock.custom_name ? ` (${lock.custom_name})` : ''} på {lock.address.street}
    </div>)
  }

  createDriverRow(lock, carrier, driver) {
    return (<div>
      Förare &nbsp; <a href="#"
        className="event-item-link"
        onClick={() =>
          this.showDriverDetails(driver, carrier)}>{driver.name} {driver.surname ? driver.surname : ''}</a>
      från {carrier.organization} öppnade {this.doorType(lock.type,lock.sub_type)}{lock.custom_name ? ` (${lock.custom_name})` : ''} på {lock.address.street}
    </div>)
  }

  render() {
    const { event, customer, driver, lock, carrier, easy_access } = this.props

    if (carrier || customer || easy_access) {
      return (
        <Grid>
          <Row style={{ marginTop: '-10px' }}>
            <Col style={{ width: '100%' }}>
              <ul className="events-list">
                <li className="events-flex-container">
                  <div className="events-flex-item-1">

                    <div className="event-thumbnail event-container">
                      {customer || easy_access ? (
                        <img
                          src="https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png"
                          style={{
                            width: '25px',
                            height: '25px',
                            marginRight: '5px'
                          }} />
                      ) : (
                          <img
                            src={carrier.image}
                            style={{ height: '35px', width: '35px' }}
                            alt="Speditörens Logga"
                          />
                        )}
                    </div>
                    <div className="event-description event-container">
                      {customer ? this.createCustomerRow(lock, customer) : null}
                      {carrier ? this.createDriverRow(lock, carrier, driver) : null}
                      {easy_access ? this.createEasyAccess(lock, easy_access) : null}
                    </div>

                    <div className="event-time event-container">
                      <span className="event-item-link">
                        {moment(event.timestamp).format('HH:mm D/MM')}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </Grid >
      )
    } else {
      return null
    }
  }
}
