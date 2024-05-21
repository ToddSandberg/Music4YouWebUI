import React from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { ratingColors } from '../constants/colorConstants';

export type PeopleColors = {
    [person: string]: string
};
type Props = {
    score: string,
    owner: string,
    updateRating: (songName:string, owner:string, value:number) => void,
    songName: string,
    peopleColors: PeopleColors
};
function RatingCell({ score, owner, updateRating, songName, peopleColors }: Props) {
    const color = score ? ratingColors[Number.parseFloat(score)] : peopleColors[owner];

    const setScore = (value: string)=> {
        const score = value.length > 0 ? Number.parseFloat(value) : 0.0;
        if (isValidScore(score)) {
            updateRating(songName, owner, score);
        }
    };

    const isValidScore = (score: number)=>{
        return (score > 0 && score <= 5 && score%0.5 === 0);
    };

    return(
        <TableCell key={`${songName}-${owner}-field`} style={{backgroundColor:color}}>
            <TextField 
                key={`${songName}-${owner}-rating`}
                style={{width:'20px'}}
                value={score}
                onChange={(event) => setScore(event.target.value)}
            />
        </TableCell>
    );
}

export default RatingCell;