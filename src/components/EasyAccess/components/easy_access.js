import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import { Row, Col, Grid } from 'react-bootstrap'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { removeEasyAccess } from '../actions'

class EasyAccess extends Component {
    removeEasyAccess(easyaccess) {
        swal({
            title: 'Vill du verkligen ta bort användaren?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Avbryt',
            confirmButtonColor: '#006e78',
            confirmButtonText: 'Ja',
            dangerMode: true
        }).then(d => {
            this.props.removeEasyAccess(easyaccess)
        }).catch(e => { })
    }


    render() {
        const { item } = this.props

        return (
            <Grid>
                <Row>
                    <Col style={{ width: '100%' }}>
                        <ul className="list">
                            <li className="flex-container">
                                <div className="flex-item-2">
                                    <h5 className="sub-title-text-utl">

                                        <a href="#" className="no-hover-effect"> <h5 className="users">{!item.name ? <p>{`${item.target}`}</p> : <p>{`${item.name} ${item.surname}, ${item.target}`}</p>}</h5></a>
                                        <button
                                            style={{ color: '#CE4547', border: 'none', backgroundColor: '#fff', display: this.props.canDelete === false ? 'none' : 'inherit' }}
                                            onClick={() => this.removeEasyAccess(item)}>
                                            <h5 className="remove-user-text">Ta bort gästnyckel</h5>
                                        </button>
                                    </h5>
                                </div>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default connect(null, { removeEasyAccess })(EasyAccess)
