
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import RatingCell from './RatingCell';
import { peopleColors } from '../constants/colorConstants';

function sumRatings(ratings) {
    return Object.values(ratings).reduce((a, b) => a + b, 0);
}

function MusicRow ({ song }) {
    const ratings = song.ratings;
    const owner = song.owner;

    return (
        <TableRow key={1}>
            <TableCell 
                component="th"
                style={{backgroundColor:peopleColors[owner]}}
            >
                {song.name}
            </TableCell>
            <RatingCell score={ratings.todd} />
            <RatingCell score={ratings.taylor} />
            <RatingCell score={ratings.alex} />
            <RatingCell score={ratings.sneh} />
            <RatingCell score={ratings.grant} />
            <RatingCell score={ratings.emma} />
            <RatingCell score={ratings.tanner} />
            <TableCell>{sumRatings(ratings)}</TableCell>
        </TableRow>
    );
}

export default MusicRow;