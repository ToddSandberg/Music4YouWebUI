import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { peopleColors, ratingColors } from '../constants/colorConstants';

function RatingCell({ score, owner, updateRating, songName }) {
    const color = score ? ratingColors[parseFloat(score)] : peopleColors[owner];

    const setScore = (value)=> {
        if (isValidScore(value)) {
            updateRating(songName,owner,value);
        }
    };

    const isValidScore = (score)=>{
        return score === '' || (score > 0 && score <= 5 && score%0.5 === 0);
    };

    return(
        <TableCell key={songName + '-' + owner + '-field'} style={{backgroundColor:color}}>
            <TextField 
                key={songName + '-' + owner + '-rating'}
                style={{width:'20px'}}
                value={score}
                onChange={(event) => setScore(event.target.value)}
            />
        </TableCell>
    );
}

export default RatingCell;