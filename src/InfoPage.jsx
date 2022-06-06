import React from 'react';
import Alert from '@material-ui/lab/Alert';
import './App.css';
import CreateAccount from './createaccount/CreateAccount';
import Login from './login/Login';
import { Button } from '@material-ui/core';
import { saveListConfiguration } from './apis/ListConfigurationsAPI';
import { v4 as uuidv4 } from 'uuid';

export default class InfoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            hasAccount: false,
            username: localStorage.getItem('username'),
        };
    }

    updateHasAccount() {
        const { hasAccount } = this.state;
        this.setState({ hasAccount: !hasAccount });
    }

    createNewList() {
        const { username } = this.state;
        const id = uuidv4();

        saveListConfiguration(id, {
            id,
            owner: username
        }).then(() => {
            window.location.href = `listConfiguration/?id=${id}`;
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const { errors, hasAccount, username } = this.state;

        if (!username) {
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
        } else {
            return (
                <div className="Info">
                    <header className="Info-header">
                        <React.Fragment>
                            { errors.map((error,index) => (<Alert severity="error" key={`error-${index}`}>{error}</Alert>))}
                        </React.Fragment>
                        <h1>Music 4 U</h1>
                        <div style={{ fontSize: '25px' }}>
                            This app is meant to share and rate others music in a weekly leaderboard.<br/>
                        </div>
                        <div style={{ fontSize: '25px' }}>
                            If youre already part of a list, use the link for the specific list.<br/>
                        </div>
                        <div style={{ fontSize: '25px' }}>
                            Or if you want to create a new list, do so by clicking the button below.<br/>
                        </div>
                        <Button
                            onClick={() => this.createNewList()}
                        >
                            Create new list
                        </Button>
                    </header>
                </div>
            );
        }
    }
}