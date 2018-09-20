import React from 'react'
import AddReceiverForm from '../../components/Lock/components/AddReceiverForm'
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

const AddEasyAccessButton = ({ lock }) => {
    let overlay

    const popoverTop = (
        <Popover id="popover-positioned-bottom">
            <AddReceiverForm lock={lock} />
        </Popover>
    )

    return (
        <OverlayTrigger
            rootClose
            placement="bottom"
            trigger="click"
            ref={node => (overlay = node)}
            overlay={popoverTop}>


            <Button style={style}>Lägg till en ny paket-mottagare <Glyphicon glyph="glyphicon glyphicon-thumbs-up" /></Button>
        </OverlayTrigger>
    )

}

export default AddEasyAccessButton
