import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { FormGroup, ControlLabel, FormControl, Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from "axios";


class Matching extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            redirect: false,
            username: null,
            target_Name: null,
            target_ProfileDesc: null,
            target_bucketList: [],
            primaryVerb: null
        }
    }

    componentDidMount() {
        console.log(this.state);
        axios.get('/auth/user').then(response => {
            console.log(response.data)
            if (!response.data.user) {
                this.setState({
                    redirect: true
                }, () => {
                    console.log("redirecting...")
                })
            } else {
                this.setState({
                    redirect: false,
                    user: response.data.user
                }, () => {
                    this.matchUser(this.state.user._id, this.state.primaryVerb)
                    // this.reloadListItems(response.data.user._id);
                })
            }
        })
    }

    matchUser = (id) => {
        // console.log("in first matchUser line")
        // console.log(id)
        API.getProfileDesc(id)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    primaryVerb: res.data.primaryVerb,
                    username: res.data.local.username
                }, () => {
                    console.log(this.state.primaryVerb)
                    API.matchUserCall(this.state.primaryVerb)
                        .then(res => {
                            console.log(res.data)
                            this.setState({
                            target_Name: res.data[0].local.username,
                            target_ProfileDesc: res.data[0].profileDescription,
                            target_bucketList: res.data[0].bucketList
                            }, () => {
                                console.log("check this state after matchUserCall: " + this.state.target_Name)
                            })
                            //things
                        }  
                    )
                        .catch(err => console.log(err));
                })
            })

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/login' }} />
        }
        return (
            <Container fluid>
            <h3>Match: </h3>
            <Row>
                <Col size="md-4"></Col>
                <Col size="md-4">
                    {this.state.target_Name}
                </Col>
                <Col size="md-4"></Col>
            </Row>
            <Row> 
                <Col size="md-4"></Col>
                <Col size="md-4">
                    {this.state.target_ProfileDesc}
                </Col>
                <Col size="md-4"></Col>
            </Row>
            </Container>
        );
    }
}

export default Matching;