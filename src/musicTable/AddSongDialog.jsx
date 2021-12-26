import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { useState } from 'react';


function AddSongDialog ({ isOpen, handleClose, addSong }) {
    const [ songName, setSongName ] = useState('');
    const [ userName, setUserName ] = useState('');

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter new song information below.
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="name"
                    label="Song Name"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
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