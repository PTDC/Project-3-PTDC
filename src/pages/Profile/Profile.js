import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
// import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: this.props,
            select: null
        }
    }
    componentDidMount() {
        console.log("hi")
        console.log(this.state)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.value)
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Adding Bucket List Items</h1>
                        </Jumbotron>
                                
                        <form>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Title (required)"
                            />
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select</ControlLabel>
                                <FormControl
                                    name="select"
                                    componentClass="select"
                                    onChange={this.handleChange}
                                >
                                    <option value="select">select</option>
                                    <option value="Go to">Go to</option>
                                    <option value="Try">Try</option>
                                </FormControl>
                            </FormGroup>
                            <Input
                                value={this.state.author}
                                onChange={this.handleInputChange}
                                name="author"
                                placeholder="Author (required)"
                            />
                            <TextArea
                                value={this.state.synopsis}
                                onChange={this.handleInputChange}
                                name="synopsis"
                                placeholder="Synopsis (Optional)"
                            />
                            <FormBtn
                                disabled={!(this.state.author && this.state.title)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Book
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