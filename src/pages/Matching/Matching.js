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
            bucketList: [],
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

    reloadListItems = (id) => {
        // console.log(id)
        API.getListItems(id)
            .then(res => {
                console.log(res.data)
                // console.log("here is the res inside getListItems: " + res.data.itemFreeText);
                this.setState({ bucketList: res.data }, () => {
                    console.log(this.state.bucketList)
                });
                // console.log("Here's the bucket list! " + this.state.bucketList)
            })
            .catch(err => console.log(err));
    };

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
                            this.reloadListItems(res.data[0]._id);
                            this.setState({
                                target_Name: res.data[0].local.username,
                                target_ProfileDesc: res.data[0].profileDescription
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
                <Row>
                    <Col size="md-4"></Col>
                    <Col size="md-4">
                        {this.state.bucketList.length ? (
                            <Container>
                                {console.log(this.state.bucketList)}
                                {this.state.bucketList.map(item => (
                                    // <strong> {console.log(this.state)} </strong>
                                    <ListItem key={item._id}>
                                        <strong>
                                            {item.itemVerb}: {item.itemFreeText}
                                        </strong>
                                    </ListItem>
                                ))}
                            </Container>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                        {this.state.target_bucketList}
                    </Col>
                    <Col size="md-4"></Col>

                </Row>
            </Container>
        );
    }
}

export default Matching;