
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import RatingCell from './RatingCell';
import { peopleColors } from '../constants/colorConstants';
import { names } from '../constants/userConstants';
import { IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


function MusicRow ({ song, updateRating, removeSong, changeSong, saveCurrentSongs }) {
    const { ratings, owner } = song;

    return (
        <TableRow>
            <TableCell
                component="th"
                style={{backgroundColor:peopleColors[owner.toLowerCase()]}}
            >
                <TextField
                    name={'name'}
                    value={song.name}
                    onChange={(event) => changeSong('name', event.target.value)}
                    onBlur={() => saveCurrentSongs()}
                />
            </TableCell>
            {names.map((name,idx) => 
                <RatingCell key={name + idx} score={ratings[name.toLowerCase()]} owner={name.toLowerCase()} songName={song.name} updateRating={updateRating}/>
            )}
            <TableCell key={song.name + '-rating'} style={{backgroundColor: '#' + song.color}}>{song.score}</TableCell>
            <TableCell>
                <IconButton 
                    onClick={() => removeSong()}
                >
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default MusicRow;