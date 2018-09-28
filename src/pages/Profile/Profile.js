import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            select: null,
            bucket_desc: ""
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
        if (this.state.title && this.state.author && this.state.user) {
          API.createItem({
            title: this.state.title,
            author: this.state.author,
            synopsis: this.state.synopsis
          })
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
        }
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