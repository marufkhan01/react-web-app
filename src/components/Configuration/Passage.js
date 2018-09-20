import React from 'react'
import { Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, Checkbox, InputGroup } from 'react-bootstrap'

export default ({ properties, update }) => {
    return (
        <form onChange={update}>
            <Row>
                <Col>
                    <Form componentClass="fieldset" inline>
                        {/* <FormGroup>
                            <ControlLabel>Port</ControlLabel>{' '}
                            <InputGroup>
                                <InputGroup.Addon>#</InputGroup.Addon>
                                <FormControl bsSize="sm" name="port_id" value={properties.port_id} type="number" />
                            </InputGroup>
                        </FormGroup>
                        {'     '}&nbsp; */}
                    <FormGroup>
                            <ControlLabel>Qlocx ID</ControlLabel>{' '}
                            <InputGroup>
                                <InputGroup.Addon>T</InputGroup.Addon>
                                <FormControl bsSize="sm" name="qlocx_id" value={properties.qlocx_id} type="text" />
                            </InputGroup>
                            {/* <FormControl.Feedback /> */}
                        </FormGroup>&nbsp;
                        <FormGroup>
                            <ControlLabel >Beskrivning av plats</ControlLabel>{' '}
                            <InputGroup>
                                <InputGroup.Addon>T</InputGroup.Addon>
                                <FormControl bsSize="sm" name="location" value={properties.location} type="text" />
                            </InputGroup>
                            {/* <FormControl.Feedback /> */}
                        </FormGroup>&nbsp;
                        <FormGroup>
                            <ControlLabel>Namn</ControlLabel>{' '}
                            <InputGroup>
                                <InputGroup.Addon>T</InputGroup.Addon>
                                <FormControl bsSize="sm" name="custom_name" value={properties.custom_name} type="text" />
                            </InputGroup>
                            {/* <FormControl.Feedback /> */}
                        </FormGroup>
                    </Form>
                </Col>
            </Row><br />
            <Row>
                <Col>
                    <Form componentClass="fieldset" inline>
                        <FormGroup>
                            <ControlLabel>Gata</ControlLabel>{' '}
                            <InputGroup>
                                <InputGroup.Addon>T</InputGroup.Addon>
                                <FormControl name="street" value={properties.street} type="text" />
                            </InputGroup>
                        </FormGroup>

                        {'     '}&nbsp;
            <FormGroup>
                            <ControlLabel>Postnummer</ControlLabel>{' '}
                            <InputGroup>
                                <InputGroup.Addon>#</InputGroup.Addon>
                                <FormControl name="zip" value={properties.zip} type="number" />
                            </InputGroup>
                            {/* <FormControl.Feedback /> */}
                        </FormGroup>
                        {'     '}&nbsp;

                        <FormGroup>
                            <ControlLabel>Stad</ControlLabel>{' '}
                            <InputGroup>
                                <InputGroup.Addon>T</InputGroup.Addon>
                                <FormControl name="city" value={properties.city} type="text" />
                            </InputGroup>
                            {/* <FormControl.Feedback /> */}
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </form>
    )
}

