
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import RatingCell from './RatingCell';
import { IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


function MusicRow ({ song, updateRating, removeSong, changeSong, saveCurrentSongs, members }) {
    const { ratings, owner } = song;
    const names = members.map((member) => member.name);
    const peopleColors = members.reduce((obj, member) => {
        obj[member.name.toLowerCase()] = member.color;
        return obj;
    }, {});

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
            {names.map((name, idx) => 
                <RatingCell
                    key={name + idx}
                    score={ratings[name.toLowerCase()]}
                    owner={name.toLowerCase()}
                    songName={song.name}
                    updateRating={updateRating}
                    peopleColors={peopleColors}
                />
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