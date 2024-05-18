import React from 'react';
import { Alert, Box, Button, Card, TextField } from '@mui/material';
import { useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../apis/LoginAPI';

export default function CreateAccount({ updateHasAccount }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    const createAccountCallback = useCallback(() => {
        const creds = {
            username,
            password
        };
        createAccount(creds).then((response) => {
            if (response && response.data) {
                console.log(response);
                console.log('account created!');
                localStorage.setItem('username', username);
                navigate('/');
                setError('');
            } else {
                console.log('could not create account');
                setError('An unknown error ocurred while creating account. Please try again in a few minutes.');
            }
        }).catch((error) => {
            console.error('Error logging in.');
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unknown error ocurred while creating account. Please try again in a few minutes.');
            }
        });
    }, [username, password]);

    return(
        <Card style={{width:300, minHeight:150, padding:5, margin:5, display: 'inline-block', overflow:'visible', verticalAlign: 'top'}}>
            Create Account
            {error && <Alert severity="error">{error}</Alert>}
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    createAccountCallback();
                }}
            >
                <TextField
                    name={'Music4Username'}
                    label={'Username'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    name={'Music4Password'}
                    label={'Password'}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    name={'Music4ConfirmPassword'}
                    label={'Confirm Password'}
                    type="password"
                    error={confirmPassword !== password}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br/>
                <Button
                    type="submit"
                    disabled={confirmPassword !== password}
                >
                    Create Account
                </Button>
            </Box>
            <div style={{ fontSize: 'calc(1px + 2vmin)' }}>Already have an account? <a href="" onClick={(event) => {event.preventDefault();updateHasAccount();}}>Log in!</a></div>
        </Card>
    );
}