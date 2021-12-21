import React from 'react';
import './App.css';
import MusicTable from './musicTable/MusicTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppBar, Box, Button } from '@material-ui/core';
import { MeetingRoom } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [ username, setUserName ] = useState(localStorage.getItem('username'));

    useEffect(() => {
        if (!username) {
            console.log('no username');
            navigate('/info');
        }
    }, [username]);

    return (
        <div className="App">
            <header className="App-header">
                <AppBar position="fixed" style={{ top: 0 }}>
                    <Box style={{position:'absolute', right:10}}>
                        {username}
                        <Button onClick={() => {localStorage.removeItem('username'); window.location.reload(false); /*TODO make modal*/}}>
                            <MeetingRoom />
                        </Button>
                    </Box>
                </AppBar>
                <img src='https://c.tenor.com/AO8nIyw4ll8AAAAC/poggers-pogchamp.gif' className="App-logo" alt="logo" />
                <p>
                  poggers poggers
                </p>
                <MusicTable/>
            </header>
        </div>
    );
}

export default App;
