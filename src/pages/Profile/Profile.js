import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import Upload from "../../components/Upload"
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
                    this.reloadProfileDesc(response.data.user._id)
                    this.reloadListItems(response.data.user._id);
                })
            }
        })
    }

    deleteBook = id => {
        API.deleteItem(id)
            .then(res => this.reloadListItems(this.state.user._id))
            .catch(err => console.log(err));
    };

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

    get_img_url = (event) => {
        console.log(event)
        this.setState({
            image_url: event
        }, () => {
            console.log(this.state)
            API.updateProfile(
                this.state.user._id,
                { image_url: this.state.image_url })
                .then(res => this.reloadProfileDesc(this.state.user._id))
                .catch(err => console.log(err));
        })

    }

    // handleFileSelect = evt => {
    //     var f = evt.target.files[0]; // FileList object
    //     var reader = new FileReader();
    //     // Closure to capture the file information.
    //     reader.onload = (function (theFile) {
    //         return function (e) {
    //             var binaryData = e.target.result;
    //             //Converting Binary Data to base 64
    //             var base64String = window.btoa(binaryData);
    //             console.log("im on 77");
    //             this.setState({ image_url: base64String })
    //             //showing file converted to base64
    //             API.saveImage(
    //                 this.state.user._id,
    //                 { profileImage: base64String })
    //                 .then(res => this.reloadProfileImage(this.state.user._id))
    //                 .catch(err => console.log(err));
    //         };

    //     });
    // };


    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.select && this.state.bucket_desc && this.state.user) {
            // console.log({
            //     itemVerb: this.state.select,
            //     itemFreeText: this.state.bucket_desc,
            //     itemAuthor: this.state.user._id
            // })
            API.createItem({
                itemVerb: this.state.select,
                itemFreeText: this.state.bucket_desc,
                itemAuthor: this.state.user._id
            }).then(res => this.reloadListItems(this.state.user._id)).catch(err => console.log(err))
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
        // console.log(id)
        API.getListItems(id)
            .then(res => {
                // console.log("here is the res inside getListItems: " + res.data.itemFreeText);
                this.setState({ bucketList: res.data });
                // console.log("Here's the bucket list! " + this.state.bucketList)
            })
            .catch(err => console.log(err));
    };

    reloadProfileDesc = (profileId) => {
        API.getProfileDesc(profileId)
            .then(res => {
                console.log(res.data)
                this.setState({
                    profile_desc: res.data.profileDescription,
                    image_url: res.data.image_url
                }, () => {
                    console.log(this.state)
                })
            })
            .catch(err => console.log(err));
    };

    reloadProfileImage = (profileId) => {
        API.getProfileImage(profileId)
            .then(res =>
                this.setState({ profile_desc: res.data.profileImage })
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
                    {/* <Col size="md-12"> */}
                    {/* <Image src={`data:image/jpeg;base64,${this.state.image_url}`} thumbnail /> */}
                    {/* <input type="file" id="files" name="files" />
                        <br />
                        <textarea id="base64" rows="5"></textarea> */}

                    {/* </Col> */}
                    <Col size="md-4"></Col>
                    <Col size="md-4">

                        {/* <form onSubmit={this.handleFileSelect}>
                            <label>Upload File:</label>
                            <input
                                type="file"
                                name="input"
                            />
                            <button type="submit">Upload</button>
                        </form> */}
                        <Upload
                            get_img_url={this.get_img_url}
                            img_prop = {this.state.image_url}
                            
                        />
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

                        <h2>Adding Bucket List Items</h2>


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
                                    <option value="See">See</option>
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

                        <h2>Bucket List Items:</h2>

                        {this.state.bucketList.length ? (
                            <List>
                                {console.log(this.state.bucketList)}
                                {this.state.bucketList.map(item => (
                                    // <strong> {console.log(this.state)} </strong>
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