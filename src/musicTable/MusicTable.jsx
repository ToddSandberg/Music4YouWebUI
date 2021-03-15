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
import { withStyles } from '@material-ui/core/styles';
import MusicRow from './MusicRow';
import { mockSongs } from '../mocks/songs';
import { peopleColors } from '../constants/colorConstants';
import { names } from '../constants/userConstants';
import SortingDropdown from './SortingDropdown';

const useStyles = theme => ({
    mainCardContainer: {width: "75%"},
    cellHeaderContainer: {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
    cellHeaderText: {marginRight: '20px'},
    cellCustom: {padding: '6px'},
});


function MusicTable({ classes }) {
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

    const sortSongs=({ type, factor, field })=> {
        console.log(type, factor, field);
        let newSongs = [...currentSongs];
        if (!type.includes("numerical")) {
            newSongs.sort((a,b)=> {
                if (a[field] > b[field]) {return factor * 1}
                if (a[field] < b[field]) {return factor * -1}
                return 0;
            });
        }
        else {
            newSongs.sort((a,b)=> {
                if (a["ratings"][field] > b["ratings"][field]) {return factor * 1}
                if (a["ratings"][field] < b["ratings"][field]) {return factor * -1}
                return 0;
            });
        }
        setCurrentSongs(newSongs);
    };

    return (
    <Card className={classes.mainCardContainer}>
        <CardContent>
        <Typography variant="h2" component="h2">
            Music For You
        </Typography>
        <TableContainer>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell><span className={classes.cellHeaderContainer}><span className={classes.cellHeaderText}>Songs</span><SortingDropdown sortSongs={sortSongs} owner={null}/></span></TableCell>
                    {names.map(name => 
                        <TableCell 
                            key={name}
                            component="th"
                            style={{backgroundColor:peopleColors[name.toLowerCase()]}}
                        >
                            <span className={classes.cellHeaderContainer}><span className={classes.cellHeaderText}>{name}</span><SortingDropdown sortSongs={sortSongs} owner={name.toLowerCase()}/></span>
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

export default withStyles(useStyles)(MusicTable);