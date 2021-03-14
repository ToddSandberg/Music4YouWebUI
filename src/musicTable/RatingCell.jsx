import React, {useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { peopleColors, ratingColors } from '../constants/colorConstants';

function RatingCell({ score, owner }) {
    const [ currentScore, setCurrentScore ] = useState(score);

    const color = currentScore ? ratingColors[currentScore] : peopleColors[owner];

    return(
        <TableCell style={{backgroundColor:color}}>
            <TextField 
                id="standard-basic" 
                style={{width:'20px'}}
                value={currentScore}
                onChange={(event) => setCurrentScore(event.target.value)}
            />
        </TableCell>
    );
}

export default RatingCell;