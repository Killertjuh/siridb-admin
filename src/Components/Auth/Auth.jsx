import React from 'react';
import { render } from 'react-dom';
import AuthActions from '../../Actions/AuthActions.jsx';
import AlertActions from '../../Actions/AlertActions.jsx';


class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            server: '',
            username: '',
            password: ''
        };
    }

    onLogin() {
        AuthActions.login(
            this.state.username,
            this.state.password,
            this.state.server
        );
        AlertActions.clearAlert();
    }

    onServerChange(event) {
        AlertActions.clearAlert();
        this.setState({
            server: event.target.value
        });
    }

    onUsernameChange(event) {
        AlertActions.clearAlert();
        this.setState({
            username: event.target.value
        });
    }

    onPasswordChange(event) {
        AlertActions.clearAlert();
        this.setState({
            password: event.target.value
        });
    }

    onKeyPress(event) {
        if (event.key == 'Enter') {
            this.onLogin();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="form">
                    <div className="form-group">
                        <div className="input-group input-group-sm">
                            <input
                                autoFocus
                                type="text"
                                className="form-control"
                                placeholder="server... e.g. localhost:9000"
                                value={this.state.server}
                                onKeyPress={this.onKeyPress.bind(this)}
                                onChange={this.onServerChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group input-group-sm">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="account name..."
                                value={this.state.username}
                                onKeyPress={this.onKeyPress.bind(this)}
                                onChange={this.onUsernameChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group input-group-sm">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password..."
                                value={this.state.password}
                                onKeyPress={this.onKeyPress.bind(this)}
                                onChange={this.onPasswordChange.bind(this)} />
                            <span className="input-group-btn">
                                <button
                                    className="btn btn-default"
                                    type="button"
                                    onClick={this.onLogin.bind(this)}>
                                    <i className="fa fa-sign-in"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;