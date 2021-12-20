import React from 'react';
import './App.css';
import MusicTable from './musicTable/MusicTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppBar, Box, Button } from '@material-ui/core';
import { MeetingRoom } from '@material-ui/icons';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <AppBar position="fixed" style={{ top: 0 }}>
                    <Box style={{position:'absolute', right:10}}>
                        {'username' /*TODO get actual username*/}
                        <Button onClick={() => {localStorage.removeItem('username'); window.location.reload(false); /*TODO make modal*/}}>
                            <MeetingRoom />
                        </Button>
                    </Box>
                </AppBar>
                <img src='https://pbs.twimg.com/profile_images/1282814612505866251/p7jnsOVy_400x400.jpg' className="App-logo" alt="logo" />
                <p>
                  poggers poggers
                </p>
                <MusicTable/>
            </header>
        </div>
    );
}

export default App;
