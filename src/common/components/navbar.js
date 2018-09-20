import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../components/Auth/redux/authAction'
import { Navbar, Nav, NavItem, MenuItem, DropdownButton } from 'react-bootstrap'
import qlocx from '../../assets/qlocx.png'

import '../assets/navbar.css'

class MainNavbar extends Component {
  logout(e) {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { userName = ''} = this.props

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <div>
              <Link to="/">
                <img id="logo" alt="Qlocx Logo" src={qlocx} />
              </Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={2}>
              <i
                className="fa fa-user"
                aria-hidden="true"
                style={{ marginRight: '3px', color: '#fff' }}
              />
              <DropdownButton
                style={{ backgroundColor: '#006E78' }}
                className="dropdown-navbar"
                title={userName}
                id="bg-nested-dropdown"
              >
                {/* <MenuItem className="dropdown-menu-item" eventKey="1">
                  <Link
                    to="/profile"
                    style={{ color: '#006e78' }}
                    className="dropdown-menu-item"
                  >
                    Profil
                  </Link>
                </MenuItem> */}
                <hr className="hr-navbar" />
                <MenuItem
                  className="dropdown-menu-item"
                  eventKey="3"
                  onClick={this.logout.bind(this)}
                >
                  Logga ut
                </MenuItem>
              </DropdownButton>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    userName: state.authReducer.user.name
  }
}

export default connect(mapStateToProps, { logout })(MainNavbar)
