import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';


function AddSongDialog ({ isOpen, handleClose, addSong, users }) {
    const [ songName, setSongName ] = useState('');
    const [ userName, setUserName ] = useState('');

    // FormControls are for formatting
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter new song information below.
                </DialogContentText>
                <FormControl fullWidth>
                    <TextField
                        id="songname"
                        label="Song Name"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="username-select-label">User Name</InputLabel>
                    <Select
                        labelId="username-select-label"
                        value={userName}
                        id="username"
                        label="Username"
                        onChange={(e) => setUserName(e.target.value)}
                    >
                        {users.map((user) => <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {
                    addSong(songName, userName);
                    handleClose();
                }}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddSongDialog;