import React from 'react';
import OktaSignIn from '@okta/okta-signin-widget';

export default class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = { user: null };
        this.widget = new OktaSignIn({
            baseUrl: 'https://dev-619613.oktapreview.com',
            clientId: '0oaga1xbfis65xjAu0h7',
            redirectUri: 'http://localhost:3000',
            authParams: {
                responseType: 'id_token'
            }
        });

        this.showLogin = this.showLogin.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.widget.session.get((response) => {
            if (response.status !== 'INACTIVE') {
                this.setState({ user: response.login });
            } else {
                // this.showLogin();
            }
        });
    }

    showLogin() {
        Backbone.history.stop();
        this.widget.renderEl({ el: '#okta-login-container' },
            (response) => {
                this.setState({ user: response.claims.email });
            },
            (err) => {
                console.log(err);
            }
        );
    }

    logout() {
        this.widget.signOut(() => {
            this.setState({ user: null });
            this.showLogin();
        });
    }

    render() {
        return (
            <div>
                {this.state.user ? (
                    <div className="container">
                        <div>Welcome, {this.state.user}!</div>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                ) : null}
                {/* {this.state.user ? null : (
                    <div id="okta-login-container" className="g-signin2" data-onsuccess="onSignIn"></div>
                )} */}
                {console.log(this.state.user)}
                {this.state.user ? null : <a href="https://dev-619613.oktapreview.com/oauth2/v1/authorize?idp=0oaga61h9hS77LGSB0h7
                &client_id=0oaga1xbfis65xjAu0h7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http://localhost:3000&state=PTDC1&nonce=PeThDaCh1">Login With Google</a>}
            </div>
        );
    }
}