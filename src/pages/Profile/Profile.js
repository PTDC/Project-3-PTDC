import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { FormGroup, ControlLabel, FormControl, Image } from 'react-bootstrap';
import pic from './perla.jpg';
import { Redirect } from 'react-router-dom';
import axios from "axios";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            select: null,
            bucket_desc: "",
            profile_desc: "",
            image_url: "",
            redirect: false,
            bucketList: []
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
                    this.reloadProfileDesc(response.data.user._id);
                })
            }
        })
    }

    handleInputChange = event => {
        console.log(event.target)
        const { name, value } = event.target;
        console.log(name, value)
        this.setState({
            [name]: value
        }, () => {
            console.log(this.state)
        });

    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.select && this.state.bucket_desc && this.state.user) {
            console.log({
                itemVerb: this.state.select,
                itemFreeText: this.state.bucket_desc,
                itemAuthor: this.state.user._id
            })
            API.createItem({
                itemVerb: this.state.select,
                itemFreeText: this.state.bucket_desc,
                itemAuthor: this.state.user._id
            }).then(res => console.log("Return from Post Bucket:"))
                // .then(res => this.reloadListItems(res.data._id))
                .catch(err => console.log(err));
        }
    };

    handleProfileUpdate = event => {
        event.preventDefault();
        if (this.state.profile_desc && this.state.user._id) {
            API.updateProfile(
                this.state.user._id,
                { profileDescription: this.state.profile_desc })
                .then(res => this.reloadProfileDesc(this.state.user._id))
                .catch(err => console.log(err));
        }
    };

    reloadListItems = (id) => {
        console.log(id)
        API.getListItems(id)
            .then(res =>
                this.setState({ bucketList: res.data.bucketList })
            )
            .catch(err => console.log(err));
    };

    reloadProfileDesc = (profileId) => {
        API.getProfileDesc(profileId)
            .then(res =>
                this.setState({ profile_desc: res.data.profileDescription })
            )
            .catch(err => console.log(err));
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/login' }} />
        }
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                    <Image src={pic} thumbnail />
                    </Col>
                    <Col size="md-4"></Col>
                    <Col size="md-4">
                        
                        <form>
                            <TextArea
                                value={this.state.profile_desc}
                                onChange={this.handleInputChange}
                                name="profile_desc"
                                placeholder="Profile Description"
                            />
                            <FormBtn
                                disabled={!(this.state.profile_desc && this.state.user)}
                                onClick={this.handleProfileUpdate}
                            >
                                Update Profile
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-3">
                    </Col>
                </Row>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Adding Bucket List Items</h1>
                        </Jumbotron>

                        <form>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select</ControlLabel>
                                <FormControl
                                    name="select"
                                    componentClass="select"
                                    onChange={this.handleInputChange}
                                >
                                    <option value="select"></option>
                                    <option value="Go to">Go to</option>
                                    <option value="Eat">Eat</option>
                                    <option value="Do">Do</option>
                                    <option value="Learn">Learn</option>
                                    <option value="Own">Own</option>
                                    <option value="Meet">Meet</option>
                                </FormControl>
                            </FormGroup>
                            <TextArea
                                value={this.state.bucket_desc}
                                onChange={this.handleInputChange}
                                name="bucket_desc"
                                placeholder="Bucket List Detail"
                            />
                            <FormBtn
                                disabled={!(this.state.bucket_desc && this.state.select)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit item
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Bucket List Items:</h1>
                        </Jumbotron>
                        {this.state.bucketList.length ? (
                            <List>
                                {this.state.bucketList.map(item => (
                                    <ListItem key={item._id}>
                                        <strong>
                                            {item.itemVerb}: {item.itemFreeText}
                                        </strong>
                                        <DeleteBtn onClick={() => this.deleteBook(item._id)} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;