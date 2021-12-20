
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import RatingCell from './RatingCell';
import { peopleColors } from '../constants/colorConstants';
import { names } from '../constants/userConstants';


function MusicRow ({ song, updateRating }) {
    const { ratings, owner } = song;

    return (
        <TableRow key={1}>
            <TableCell 
                key={song.name}
                component="th"
                style={{backgroundColor:peopleColors[owner]}}
            >
                {song.name}
            </TableCell>
            {names.map((name,idx) => 
                <RatingCell key={name + idx} score={ratings[name.toLowerCase()]} owner={name.toLowerCase()} songName={song.name} updateRating={updateRating}/>
            )}
            <TableCell key={song.name + '-rating'} style={{backgroundColor: '#' + song.color}}>{song.score}</TableCell>
        </TableRow>
    );
}

export default MusicRow;