import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Home from './components/Home'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Profile from "./pages/Profile";
// import Matching from "./pages/Matching";
// import Inbox from "./pages/Inbox";

const DisplayLinks = props => {
    if (props.loggedIn) {
        return (
            // <nav className="navbar">
            // 	<ul className="nav">
            // 		<li className="nav-item">
            // <Link to="/" className="nav-link">
            // 	Home
            // </Link>
            // 		</li>
            // 		<li>
            // <Link to="#" className="nav-link" onClick={props._logout}>
            // 	Logout
            // </Link>
            // 		</li>
            // 	</ul>
            // </nav>


            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/" className="nav-link">
                            Home
            			</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Link to="/profile" className="nav-link">
                    Profile
                    </Link>

                <Nav>
                    <Link to="#" className="nav-link" onClick={props._logout}>
                        Logout
                    </Link>
                    <Router>
                        <Switch>
                            {/* <Route exact path="/profile" component={Profile} /> */}
                            {/* {<Route exact path="/matching" component={Matching} />}
                                { <Route exact path="/inbox" component={Inbox} /> }  */}
                        </Switch>
                    </Router>

                    {/* <NavItem eventKey={2} href="#">
                        Link
                    </NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown> */}
                </Nav>
            </Navbar>
        )
    } else {
        return (
            <nav className="navbar">
                {/* <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
						</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            login
						</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            sign up
						</Link>
                    </li> */}
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/" className="nav-link">
                                HOME
            			</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <Navbar.Brand>
                            <Link to="/login" className="nav-link">
                                LOGIN
						        </Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to="/signup" className="nav-link">
                                SIGN UP
						        </Link>
                        </Navbar.Brand>
                    </Nav>
                </Navbar>
                {/* </ul> */}
            </nav>
        )
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            user: null,
            redirect: false
        }
        this._logout = this._logout.bind(this)
        this._login = this._login.bind(this)
    }
    componentDidMount() {
        axios.get('/auth/user').then(response => {
            console.log(response.data)
            if (!!response.data.user) {
                console.log(response.data.user)
                this.setState({
                    loggedIn: true,
                    user: response.data.user
                }, () => {
                    console.log(this.state.user)
                })
            } else {
                this.setState({
                    loggedIn: false,
                    user: null
                })
            }
        })
    }

    _logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/auth/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.setState({
                    loggedIn: false,
                    user: null,
                    redirect: true
                })

            }
        })
    }

    _login(username, password) {
        axios
            .post('/auth/login', {
                username,
                password
            })
            .then(response => {
                console.log(response.data.user)
                if (response.status === 200) {
                    // update the state
                    this.setState({
                        loggedIn: true,
                        user: response.data.user
                    })
                }
            })
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={"/login"} />
        // }
        return (
            <div className="App">
                <h1>Bucket List</h1>
                <Header user={this.state.user} />
                {/* LINKS to our different 'pages' */}
                <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} user={this.state.user} />
                {/*  ROUTES */}
                {/* <Route exact path="/" component={Home} /> */}
                <Switch>
                    <Route exact path="/profile" render={() => <Profile user={this.state.user} test={console.log(this.state.user)} />} />
                    <Route exact path="/" render={() => <Home user={this.state.user} />} />
                    <Route
                        exact
                        path="/login"
                        render={() =>
                            <LoginForm
                                _login={this._login}
                                _googleSignin={this._googleSignin}
                            />}
                    />
                    <Route exact path="/signup" component={SignupForm} />
                </Switch>
                {/* <LoginForm _login={this._login} /> */}
            </div>
        )
    }
}
export default App