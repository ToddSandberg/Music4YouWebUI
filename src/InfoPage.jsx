import React from 'react';
import Alert from '@material-ui/lab/Alert';
import './App.css';
import CreateAccount from './createaccount/CreateAccount';
import Login from './login/Login';

export default class InfoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            hasAccount: false,
        };
    }

    updateHasAccount() {
        const { hasAccount } = this.state;
        this.setState({ hasAccount: !hasAccount });
    }

    render() {
        const { errors, hasAccount } = this.state;

        return(
            <div className="Info">
                <header className="Info-header">
                    <React.Fragment>
                        { errors.map((error,index) => (<Alert severity="error" key={`error-${index}`}>{error}</Alert>))}
                    </React.Fragment>
                    <h1>Music 4 U</h1>
                    <div style={{ fontSize: '25px' }}>
                        This app is meant to share and rate others music in a weekly leaderboard.<br/>
                    </div>
                    { hasAccount ? <Login updateHasAccount={() => this.updateHasAccount()}/> : <CreateAccount updateHasAccount={() => this.updateHasAccount()}/>}
                </header>
            </div>
        );
    }
}