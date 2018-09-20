import React from 'react'
import AddUserForm from '../../components/AddUser/components/AddUserForm'
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

const AddUserButton = ({ lock }) => {
  let overlay

  const popoverTop = (
    <Popover id="popover-positioned-bottom">
      <AddUserForm lock={lock} />
    </Popover>
  )

  return (
    <OverlayTrigger
      rootClose
      placement="bottom"
      trigger="click"
      ref={node => (overlay = node)}
      overlay={popoverTop}
    >
      <Button style={style}>Lägg till en ny användare <Glyphicon glyph="glyphicon glyphicon-plus" /></Button>
    </OverlayTrigger>
  )
}

export default AddUserButton
