import React, { Component } from 'react'
import Modal from 'react-modal'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { translate } from '../../common/utils'

const styles = {
    content: {
        top: '5%',
        left: '25%',
        bottom: '5%',
        right: '25%'
    }
}

export class EasyAccess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    render() {
        const { item, unallocate } = this.props
        const target = item.target ? item.target : {}
        const cust = target.name ? target : null

        var visible_keys = ['created', 'unlimited_uses', 'target']

        return (
            <div>
                <h5>Allokerad till gäst: {cust ? cust.name + ' ' + cust.surname : item.target}</h5>
                <button onClick={this.openModal}>Visa</button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={styles}
                    contentLabel="Example Modal"
                >

                    <button onClick={this.closeModal}>Stäng</button>
                    <h2>Gästnyckel</h2>
                    <ListGroup>
                        {visible_keys.map((key, i) => {
                            return (<ListGroupItem key={i} header={translate(key)}>
                                {typeof item[key] == 'object' && key == 'target' ? item[key].name + ' ' + item[key].surname : String(item[key])}
                            </ListGroupItem>)
                        })}
                    </ListGroup>

                    <button>Skicka ut nyckel igen</button>

                    <button onClick={() => unallocate(item._id)}>Radera nyckel</button>

                </Modal>
            </div>
        )
    }
}

export class Delivery extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (<p>DELIVERY</p>)
    }
}

export class Retur extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (<p>RETUR</p>)
    }
}