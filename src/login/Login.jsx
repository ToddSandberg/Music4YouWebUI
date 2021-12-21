import { Card, Box, Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { login } from '../apis/LoginAPI';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ updateHasAccount }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    const loginCallback = useCallback(() => {
        const creds = {
            username,
            password
        };
        login(creds).then((response) => {
            if (response && response.data) {
                console.log(response);
                console.log('logged in!');
                localStorage.setItem('username', username);
                navigate('/');
                setError('');
            } else {
                console.log('could not log in');
                setError('A user does not exist with the given Username and Password.');
            }
        }).catch((error) => {
            console.error(error);
            setError('An unknown error ocurred while logging in. Please try again in a few minutes.');
        });
    }, [username, password]);

    return (<Card style={{width:300, minHeight:150, padding:5, margin:5, display: 'inline-block', overflow:'visible', verticalAlign: 'top'}}>
        Login here
        {error && <Alert severity="error">{error}</Alert>}
        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault();
                loginCallback();
            }}
        >
            <TextField
                name={'Music4Username'}
                label={'Username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="music-username"
            />
            <TextField
                name={'Music4Password'}
                label={'Password'}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="music-password"
            />
            <br/>
            <Button
                type="submit"
            >
                Login
            </Button>
        </Box>
        <div style={{ fontSize: '15px' }}>Dont have an account? <a href="" onClick={(event) => {event.preventDefault();updateHasAccount();}}>Create one now!</a></div>
    </Card>);
}