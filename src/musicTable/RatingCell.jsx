import React, {useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { ratingColors } from '../constants/colorConstants';

function RatingCell({ score }) {
    const [ currentScore, setCurrentScore ] = useState(score);

    return(
        <TableCell style={{backgroundColor:ratingColors[currentScore]}}>
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