import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { fetchData, getLock } from '../../common/redux/CollectionActions'
import _ from 'lodash'
import Door from './Door'
import LockHeaderWithSub from '../../common/components/LockHeaderWithSub'
import MainNavbar from '../../common/components/navbar'
import { unallocateDoor, allocateDoor } from './actions'



class BrowseClusterDoors extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.unallocateDoor = this.unallocateDoor.bind(this)
        this.allocateDoor = this.allocateDoor.bind(this)
    }


    componentDidMount() {
        this.props.fetchData(['easy_accesses', 'deliveries', 'customers', 'locks'])
    }

    unallocateDoor(itemid) {
        this.props.unallocateDoor(this.props.match.params.lockid, itemid)
    }

    allocateDoor(lock_id, door_id, obj) {
        this.props.allocateDoor(this.props.match.params.lockid, door_id, obj)
    }

    //radera två allocations i rad utan att ha uppdaterat sidan emellan att man la till dom gör att bara den första raderas!

    render() {
        const { easy_accesses, deliveries, customers, locks } = this.props
        var lock = null
        if (this.props.locks) lock = this.props.locks.find(lock => lock._id == this.props.match.params.lockid)

        if (!lock || !easy_accesses || !customers) return (<p>Laddar</p>)


        const keyed_easy_accesses = _.keyBy(this.props.easy_accesses, '_id')
        const keyed_customers = _.keyBy(this.props.customers, 'phone')
        const keyed_deliveries = _.keyBy(this.props.deliveries, '_id')

        const doors = lock.doors.map(door => {
            var easy_access = keyed_easy_accesses[door.allocation.easy_access]
            var delivery = keyed_deliveries[door.allocation.delivery]
            if (easy_access) {
                if (keyed_customers[easy_access.target])
                    easy_access.target = keyed_customers[easy_access.target]

                door.allocation.easy_access = easy_access
            }
            if (delivery) {
                door.allocation.delivery = delivery
            }

            return door
        })

        const chunked_doors = _.chunk(doors, 3)

        return (
            <div>
                <MainNavbar />
                <Grid>
                    <Row className="show-grid">
                        <Col md={12} className="text-center">
                            <LockHeaderWithSub header={lock.custom_name} />
                        </Col>
                    </Row>
                </Grid>

                <Grid>
                    {chunked_doors.map((chunk, i) => {
                        return (<Row key={i} className="show-grid">
                            {chunk.map((door, ii) => {
                                return (
                                    <Col key={ii} xs={12} md={4} lg={4}>
                                        <Door key={i} door={door} lock={lock} unallocateDoor={this.unallocateDoor} allocateDoor={this.allocateDoor} />
                                    </Col>
                                )
                            })}
                        </Row>)
                    })}
                </Grid>

            </div>
        )
    }
}

const mapState = (state, props) => {
    // console.log(state.collectionData.lock.doors)
    console.log(state.collectionData.locks)
    return {
        deliveries: state.collectionData.deliveries,
        easy_accesses: state.collectionData.easy_accesses,
        customers: state.collectionData.customers,
        locks: state.collectionData.locks,
        lock: state.collectionData.lock
    }
}

const mapDispatch = (dispatch) => {
    return {
        unallocateDoor: (lockid, itemid) => dispatch(unallocateDoor(lockid, itemid)),
        allocateDoor: (lock_id, door_id, obj) => dispatch(allocateDoor(lock_id, door_id, obj)),
        fetchData: (params) => dispatch(fetchData(params))
    }
}

export default connect(mapState, mapDispatch)(BrowseClusterDoors)