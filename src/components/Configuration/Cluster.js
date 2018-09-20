import React from 'react'
import { Grid, Row, Col, Button, Form, FormGroup, Panel, FormControl, ControlLabel, Checkbox, InputGroup, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import CopyAddressOf from '../../common/components/CopyAddressOf'

export default ({ properties, passages, update, copyAddress, slave }) => {

    return (
        <form onChange={update}>
            <ListGroup>
                <ListGroupItem style={{ border: 'none' }}>

                    <Panel>
                        <Panel.Heading>Enhet</Panel.Heading>
                        <Panel.Body>

                            <Form componentClass="fieldset" inline>
                                <FormGroup>
                                    <ControlLabel>Antal paketlådor</ControlLabel>{' '}
                                    <InputGroup>
                                        <InputGroup.Addon>#</InputGroup.Addon>
                                        <FormControl name="door_qty" value={properties.door_qty} type="number" />
                                    </InputGroup>
                                </FormGroup>&nbsp;

                                <FormGroup>
                                    <ControlLabel>Qlocx ID</ControlLabel>{' '}
                                    <InputGroup>
                                        <InputGroup.Addon><Glyphicon glyph="glyphicon glyphicon-text-background" /></InputGroup.Addon>
                                        <FormControl name="qlocx_id" value={properties.qlocx_id} type="text" />
                                    </InputGroup>
                                </FormGroup>&nbsp;
                                <FormGroup>
                                    <ControlLabel >Beskrivning av plats</ControlLabel>{' '}
                                    <InputGroup>
                                        <InputGroup.Addon>T</InputGroup.Addon>
                                        <FormControl bsSize="sm" name="location" value={properties.location} type="text" />
                                    </InputGroup>
                                    {/* <FormControl.Feedback /> */}
                                </FormGroup>&nbsp;


                            </Form>
                        </Panel.Body>
                    </Panel>
                </ListGroupItem>
                <ListGroupItem style={{ border: 'none', display: slave ? 'none' : 'inherit' }}>

                    <Panel>
                        <Panel.Heading>Adress</Panel.Heading>
                        <Panel.Body>
                            <p>Använd adress: {passages.map((p, i) => { return (<CopyAddressOf key={i} passage={p} click={() => copyAddress(i)} />) })}</p>
                            <Form componentClass="fieldset" inline>
                                <FormGroup>
                                    <ControlLabel>Gata</ControlLabel>{' '}
                                    <InputGroup>
                                        <InputGroup.Addon><Glyphicon glyph="glyphicon glyphicon-text-background" /></InputGroup.Addon>
                                        <FormControl name="street" value={properties.street} onChange={update} type="text" />
                                    </InputGroup>
                                </FormGroup>

                                {'     '}&nbsp;
            <FormGroup>
                                    <ControlLabel>Postnummer</ControlLabel>{' '}
                                    <InputGroup>
                                        <InputGroup.Addon>#</InputGroup.Addon>
                                        <FormControl name="zip" value={properties.zip} type="number" />
                                    </InputGroup>
                                </FormGroup>
                                {'     '}&nbsp;

                        <FormGroup>
                                    <ControlLabel>Stad</ControlLabel>{' '}
                                    <InputGroup>
                                        <InputGroup.Addon><Glyphicon glyph="glyphicon glyphicon-text-background" /></InputGroup.Addon>
                                        <FormControl name="city" value={properties.city} type="text" />
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </Panel.Body>
                    </Panel>
                </ListGroupItem>
            </ListGroup>
        </form>
    )
}

