
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import RatingCell from './RatingCell';
import { peopleColors } from '../constants/colorConstants';
import { names } from '../constants/userConstants';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


function MusicRow ({ song, updateRating, removeSong }) {
    const { ratings, owner } = song;

    return (
        <TableRow key={1}>
            <TableCell 
                key={song.name}
                component="th"
                style={{backgroundColor:peopleColors[owner.toLowerCase()]}}
            >
                {song.name}
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