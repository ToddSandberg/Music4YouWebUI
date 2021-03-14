
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import RatingCell from './RatingCell';
import { peopleColors } from '../constants/colorConstants';
import { names } from '../constants/userConstants';

function sumRatings(ratings) {
    return Object.values(ratings).reduce((a, b) => a + b, 0);
}

function MusicRow ({ song }) {
    const { ratings, owner } = song;

    return (
        <TableRow key={1}>
            <TableCell 
                component="th"
                style={{backgroundColor:peopleColors[owner]}}
            >
                {song.name}
            </TableCell>
            {names.map(name => 
                    <RatingCell score={ratings[name.toLowerCase()]} owner={name.toLowerCase()} />
            )}
            <TableCell>{sumRatings(ratings)}</TableCell>
        </TableRow>
    );
}

export default MusicRow;