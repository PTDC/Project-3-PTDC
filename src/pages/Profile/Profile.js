import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { FormGroup, ControlLabel, FormControl, Image } from 'react-bootstrap';
import pic from './perla.jpg';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            select: null,
            bucket_desc: "",
            profile_desc: "",
            image_url: ""
        }
    }
    componentDidMount() {
        console.log(this.state)
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
            API.createItem({
                itemVerb: this.state.select,
                itemFreeText: this.state.bucket_desc,
                itemAuthor: this.state.user
            })
                .then(res => this.reloadListItems())
                .catch(err => console.log(err));
        }
    };

    reloadListItems = () => {
        API.getListItems()
            .then(res =>
                this.setState({ itemVerb: "", itemFreeText: "" })
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-3">
                    </Col>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Profile Pic here</h1>
                            <Image src={pic} thumbnail />
                        </Jumbotron>
                        <form>
                            <TextArea
                                value={this.state.profile_desc}
                                onChange={this.handleInputChange}
                                name="profile_desc"
                                placeholder="Profile Description"
                            />
                            <FormBtn
                                disabled={!(this.state.bucket_desc && this.state.select)}
                                onClick={this.handleFormSubmit}
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
                            <h1>Books On My List</h1>
                        </Jumbotron>
                        {/* {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem key={book._id}>
                                        <Link to={"/books/" + book._id}>
                                            <strong>
                                                {book.title} by {book.author}
                                            </strong>
                                        </Link>
                                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )} */}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;