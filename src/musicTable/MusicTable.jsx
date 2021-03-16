import React, { useCallback, useEffect, useState } from 'react';
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
import { getSongs, saveSongs } from '../apis/songsAPI';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rainbow from 'rainbowvis.js';


const useStyles = theme => ({
    mainCardContainer: {width: "75%"},
    cellHeaderContainer: {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
    cellHeaderText: {marginRight: '20px'},
    cellCustom: {padding: '6px'},
});

function sumRatings(ratings) {
    return Object.values(ratings).reduce((a, b) => isNaN(parseFloat(b)) ? 0 + a: parseFloat(b) + a, 0);
}
let ratingsRange = {'min': undefined, 'max': undefined};
const rainbowRed = new Rainbow();
const rainbowGreen = new Rainbow();
rainbowRed.setSpectrum('#E06666', '#FFD666');
rainbowGreen.setSpectrum('#FFD666', '#34A853');

const initializeRainbows = () => {
    const min = ratingsRange.min;
    const max = ratingsRange.max;
    rainbowRed.setNumberRange(min, (max+min)/2); 
    rainbowGreen.setNumberRange((max+min)/2, max);
}

const getColor = (num) => {
    return num <= (ratingsRange.max+ratingsRange.min)/2 ? rainbowRed.colourAt(num) : rainbowGreen.colourAt(num);
}


function MusicTable({ classes }) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ currentSongs, setCurrentSongs ] = useState([]);

    const generateColors = (songs) => {
        if (songs === undefined || songs.length === 0) {return}
        ratingsRange.max = undefined;
        ratingsRange.min = undefined;
        for (let song of songs) {
            song['score'] = sumRatings(song.ratings);
            if (ratingsRange.max === undefined || song.score > ratingsRange.max) {ratingsRange.max = song.score}
            if (ratingsRange.min === undefined || song.score < ratingsRange.min) {ratingsRange.min = song.score}
        }
        initializeRainbows();
        for (let song of songs) {
            song['color'] = getColor(song.score);
        }
    }

    useEffect(() => {
        getSongs().then((response) => {
            const songs = response.data.songs['2020-01-20'].songs;
            generateColors(songs);
            setCurrentSongs(songs); //TODO get actual week
            setIsLoading(false);
        })
        .catch((response) => {
            console.error('Error getting songs, using mocks'); //TODO handle error response
            const songs = mockSongs['2020-01-20'].songs;
            generateColors(songs);
            setCurrentSongs(songs); //TODO get actual week
            setIsLoading(false);
        });
    }, []);

    const updateRating = (songName, songRater, value) => {
        let newSongs = [...currentSongs];
        for (let song of newSongs) {
            if (song.name===songName) {
                song["ratings"][songRater] = value;
                song['score'] = sumRatings(song['ratings']);
                break;
            }
        }
        saveSongs({
            '2020-01-20': { //TODO get actual week
                'songs': newSongs
            }
        });
        generateColors(newSongs);
        setCurrentSongs(newSongs);
    };

    const sortSongs=({ type, factor, field })=> {
        let newSongs = [...currentSongs];
        if (!type.includes("numerical")) {
            newSongs.sort((a,b)=> {
                if (a[field] > b[field]) {return factor * 1}
                if (a[field] < b[field]) {return factor * -1}
                return 0;
            });
        }
        else {
            if (field === 'total') {
                newSongs.sort((a,b)=> {
                    if (a['score'] > b['score']) {return factor * 1}
                    if (a['score'] < b['score']) {return factor * -1}
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
                    <TableCell style={{backgroundColor: "#fbbc04"}}><span className={classes.cellHeaderContainer}><span className={classes.cellHeaderText}>Total</span><SortingDropdown sortSongs={sortSongs} owner={'total'}/></span></TableCell>
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