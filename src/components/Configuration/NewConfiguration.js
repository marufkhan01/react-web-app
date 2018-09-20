import React, { Component } from 'react'
import store from '../../store'
import { connect } from 'react-redux'
import MainNavbar from '../../common/components/navbar'
import { Grid, Row, Col, Button, Panel, Glyphicon } from 'react-bootstrap'
import Passage from './Passage'
import Cluster from './Cluster'
import { _ } from 'lodash'
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { submitConfiguration } from './action'

class NewConfiguration extends Component {

    constructor(props) {
        super(props)
        this.state = {
            passages: [],
            clusters: []
        }

        this.addPassage = this.addPassage.bind(this)
        this.addCluster = this.addCluster.bind(this)

        this.updateElement = this.updateElement.bind(this)
        this.removeElement = this.removeElement.bind(this)

        this.submit = this.submit.bind(this)
    }

    addPassage() {
        var state = Object.assign({}, this.state)
        state.passages.push({
            custom_name: "Passagedörren",
            location: "Mot gatan",
            qlocx_id: 'passage1',
            port_id: 0,
            street: "Götaforsvägen 9",
            zip: 12266,
            city: "Enskede"
        })
        this.setState(state)
    }

    addCluster() {
        var state = Object.assign({}, this.state)
        state.clusters.push({
            qlocx_id: 'cluster11',
            location: "Innanför porten till höger",
            door_qty: 6,
            street: null,
            zip: null,
            city: null
        })
        this.setState(state)
    }

    updateElement(e, i, prop_name) {
        var state = Object.assign({}, this.state)

        state[prop_name][i][e.target.name] = e.target.value

        this.setState(state)
    }

    removeElement(i, prop_name) {
        var state = Object.assign({}, this.state)

        console.log(i)

        state = state[prop_name].splice(i, 1)
        this.setState(state)
    }

    copyAddress(p_i, c_i) {
        var state = Object.assign({}, this.state)

        state["clusters"][c_i].street = state["passages"][p_i].street
        state["clusters"][c_i].city = state["passages"][p_i].city
        state["clusters"][c_i].zip = state["passages"][p_i].zip

        this.setState(state)
    }

    componentWillMount() {
        this.addPassage()
        // this.addCluster()
        // this.copyAddress(0, 0)
        // this.addCluster()
        // this.submit()
    }

    // state.passages.push({
    //     custom_name: "Passagedörren",
    //     location: "Mot gatan",
    //     qlocx_id: '',
    //     port_id: 0,
    //     street: "Götaforsvägen 9",
    //     zip: 12266,
    //     city: "Enskede"
    // })

    submit() {
        //TODO: kolla dubbla qlocx_idn på olika enheter

        var properties = [
            ["qlocx_id", "Qlocx ID"],
            ["street", "Gata"],
            ["zip", "Postnummer"],
            ["city", "Ort"],
            ["location", "Beskrivning av plats"]
        ]

        var passages_missing_properties = properties.filter(pair => {
            return this.state.passages.filter(passage => {
                if (passage.hasOwnProperty(pair[0])) {
                    if (!passage[pair[0]]) return true
                    if (passage[pair[0]] == '') return true
                }

                return false

            }).length != 0
        })

        var clusters_missing_properties = properties.filter(pair => {
            return this.state.clusters.filter((cluster, i) => {
                if (i == 0) {
                    if (cluster.hasOwnProperty(pair[0])) {
                        if (!cluster[pair[0]]) return true
                        if (cluster[pair[0]] == '') return true
                    }
                }

                return false
            }).length != 0
        })

        if (passages_missing_properties.length || clusters_missing_properties.length) {
            var missing_desc = `<b>Passage(r) saknar:</b> ${passages_missing_properties.map(p => p[1]).join(', ') || '-'}<br/><b>Cluster saknar:</b> ${clusters_missing_properties.map(c => c[1]).join(', ') || '-'}`

            swal({
                title: 'Fyll i alla fält',
                html: missing_desc,
                type: 'error',
                confirmButtonColor: '#006e78',
            })
        } else {
            this.props.submitConfiguration(this.state)
        }
    }


    render() {

        var style = {
            fontWeight: 400,
            backgroundColor: '#006e78',
            border: 'none',
            borderRadius: '5px',
            color: 'white'
        }

        return (
            <div>
                <MainNavbar />
                <Grid>
                    <Row className="show-grid">
                        <Col md={12} className="text-center">
                            <h2>Konfigurera passage & paketlådor</h2>
                        </Col>
                    </Row>
                </Grid>
                <hr className="little-hr" width="70%" />
                <Grid>
                    <Row className="show-grid">
                        <Col md={12} className="text-center">
                            <Button style={style} onClick={this.addPassage}>Lägg till passage <Glyphicon glyph="glyphicon glyphicon-road" /></Button> &nbsp; <Button style={style} onClick={this.addCluster}>Lägg till cluster <Glyphicon glyph="glyphicon glyphicon-th" /></Button>

                            <h3>Passager</h3>

                            {!this.state.passages.length ? <p>-</p> : null}
                            <Grid>
                                {this.state.passages.map((p, i) => {
                                    return (

                                        <Panel key={i}>
                                            <Panel.Heading><Panel.Title>Passage {i + 1} </Panel.Title><Button onClick={() => this.removeElement(i, 'passages')} style={{ marginLeft: "90%", marginTop: '-35px' }} bsStyle="danger"><Glyphicon glyph="glyphicon glyphicon-remove" /></Button></Panel.Heading>
                                            <Panel.Body>
                                                <Grid>
                                                    <Passage properties={p} update={(e) => this.updateElement(e, i, 'passages')} />
                                                </Grid>
                                            </Panel.Body>
                                        </Panel>

                                    )
                                })}
                            </Grid>


                            <hr className="little-hr" width="70%" />

                            <h3>Cluster</h3>

                            <Row>
                                <Col md={12}>
                                    {this.state.clusters.map((c, i) => {
                                        var slave = i == 0 ? false : true

                                        return (

                                            <Panel key={i}>
                                                <Panel.Heading><Panel.Title>Cluster {i + 1}{slave ? `: slav till Cluster 1` : ''}</Panel.Title><Button onClick={() => this.removeElement(i, 'clusters')} style={{ marginLeft: '90%', marginTop: '-35px' }} bsStyle="danger"><Glyphicon glyph="glyphicon glyphicon-remove" /></Button></Panel.Heading>
                                                <Panel.Body>
                                                    <Cluster slave={slave} properties={c} passages={this.state.passages} update={(e) => this.updateElement(e, i, 'clusters')} copyAddress={(p_index) => this.copyAddress(p_index, i)} />
                                                </Panel.Body>
                                            </Panel>

                                        )
                                    })}
                                </Col>
                            </Row>


                            <Row />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="text-center">
                            <Button className="save-settings-btn" type="submit" onClick={this.submit}>
                                Spara
                   </Button>
                        </Col>

                        <Row>
                            <Col md={12}>&nbsp;</Col>
                        </Row>
                    </Row>
                </Grid>
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
        submitConfiguration: (configuration) => dispatch(submitConfiguration(configuration))
    }
}

export default connect(mapState, mapDispatch)(NewConfiguration)











