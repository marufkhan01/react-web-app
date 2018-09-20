import React from 'react'
import AddEasyAccessForm from '../../components/EasyAccess/components/AddEasyAccessForm'
import { Button, Popover, OverlayTrigger, Glyphicon } from 'react-bootstrap'

var style = {
    fontWeight: 400,
    // width: '150px',
    // marginTop: '10%',
    backgroundColor: '#f1f1f1',
    border: 'none',
    borderRadius: '5px',
    color: 'grey'
}

const AddEasyAccessButton = ({ lock, door, allocateDoor }) => {
    let overlay

    const popoverTop = (
        <Popover id="popover-positioned-bottom">
            <AddEasyAccessForm lock={lock} door={door} allocateDoor={allocateDoor} />
        </Popover>
    )

    return (
        <OverlayTrigger
            rootClose
            placement="bottom"
            trigger="click"
            ref={node => (overlay = node)}
            overlay={popoverTop}>



            <Button style={style}>Skicka ut en ny gästnyckel <Glyphicon glyph="glyphicon glyphicon-send" /></Button>
        </OverlayTrigger>
    )

}

export default AddEasyAccessButton
