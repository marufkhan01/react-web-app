import React, { Component } from 'react'
import Modal from 'react-modal'
import store from '../../store'
import { connect } from 'react-redux'
import { fetchData } from '../../common/redux/CollectionActions'
import _ from 'lodash'
import { translate } from '../../common/utils'
import { Panel, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap'
import { EasyAccess, Delivery, Retur } from '../../common/components/Allocations'
import './styles.css'
import AddEasyAccessButton from '../../common/components/AddEasyAccessButton'




class Door extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        const { door, lock } = this.props
        var is_unavailable = Object.keys(door.allocation).filter(key => {
            if (door.allocation[key]) return true
        })
        const icon = !is_unavailable.length ? <Glyphicon glyph="glyphicon glyphicon-ok" /> : <Glyphicon glyph="glyphicon glyphicon-remove" />

        var panel_style = 'available'
        const alloc_type = Object.keys(door.allocation).find(alloc => {
            return !!door.allocation[alloc]
        })

        const alloc_component = () => {
            switch (alloc_type) {
                case "easy_access":
                    panel_style = 'occupied'
                    return (<EasyAccess item={door.allocation[alloc_type]} unallocate={this.props.unallocateDoor} />)
                case "delivery":
                    panel_style = 'occupied'
                    return (<Delivery />)
                case "retur":

                    return (<b>retur</b>)
                case "retur":
                    return (<Retur />)
                default:
                    return (<AddEasyAccessButton lock={lock} door={door} allocateDoor={this.props.allocateDoor} />)
            }
        }

        return (
            <div>
                <Panel bsClass={panel_style}>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{door.display_name} {icon}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {alloc_component()}
                    </Panel.Body>
                </Panel>
            </div>
        )
    }


}

const mapState = (state, props) => {
    return {

    }
}

const mapDispatch = (dispatch) => {
    return {
    }
}

export default connect(mapState, mapDispatch)(Door)