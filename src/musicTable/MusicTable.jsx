import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MusicRow from './MusicRow';
import { mockSongs } from '../mocks/songs';
import { peopleColors } from '../constants/colorConstants';
import { names } from '../constants/userConstants';
import SortingDropdown from './SortingDropdown';

function MusicTable() {
    let [currentSongs, setCurrentSongs] = useState(mockSongs['2020-01-20'].songs);

    const updateRating = (songName, songRater, value) => {
        let newSongs = [...currentSongs];
        for (let song of newSongs) {
            if (song.name===songName) {
                song["ratings"][songRater] = value;
                break;
            }
        }
        setCurrentSongs(newSongs);
    }

    const sortSongsName=(factor)=> {
        let newSongs = [...currentSongs];
        newSongs.sort((a,b)=> {
            if (a.name > b.name) {return factor * 1}
            if (a.name < b.name) {return factor * -1}
            return 0;
        });
        setCurrentSongs(newSongs);
    };
    
    const sortSongs = (options)=> {
        const { type } = options;
        if (type==="name-alphabetical") sortSongsName(1);
        if (type==="name-alphabetical-reverse") sortSongsName(-1);
    }

    return (
    <Card>
        <CardContent>
        <Typography variant="h2" component="h2">
            Music For You
        </Typography>
        <TableContainer>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell style={{width: '250px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>Songs <SortingDropdown sortSongs={sortSongs}/></TableCell>
                    {names.map(name => 
                        <TableCell 
                            key={name}
                            component="th"
                            style={{backgroundColor:peopleColors[name.toLowerCase()]}}
                        >
                            {name}
                        </TableCell>
                    )}
                    <TableCell>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {currentSongs.map(song => <MusicRow key={song.name} updateRating={updateRating} song={song}/>)}
            </TableBody>
        </Table>
        </TableContainer>
        </CardContent>
    </Card>
    );
}

export default MusicTable;