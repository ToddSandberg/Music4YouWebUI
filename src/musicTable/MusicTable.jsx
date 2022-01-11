import React, { useEffect, useState } from 'react';
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
import Rainbow from 'rainbowvis.js';
import { Button, CircularProgress, TextField, Tooltip } from '@material-ui/core';
import { useCallback } from 'react';
import AddSongDialog from './AddSongDialog';
import { getDateFromDateString, getDateString, getMonday, getUserDate, subtractDays } from '../helpers/TimeHelper';
import { useNavigate } from 'react-router-dom';
import { Help } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';


const useStyles = () => ({
    mainCardContainer: {width: '75%'},
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
    if (min == max) {
        return;
    }
    rainbowRed.setNumberRange(min, (max+min)/2); 
    rainbowGreen.setNumberRange((max+min)/2, max);
};

const getColor = (num) => {
    return num <= (ratingsRange.max+ratingsRange.min)/2 ? rainbowRed.colourAt(num) : rainbowGreen.colourAt(num);
};


function MusicTable({ classes }) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ songResponse, setSongResponse ] = useState([]);
    const [ currentSongs, setCurrentSongs ] = useState([]);
    const [ addSongModalOpen, setAddSongModalOpen ] = useState(false);
    const [ today, setToday ] = useState(getMonday(getUserDate()));
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    const [ id ] = useState(idParam || '5');
    const navigate = useNavigate();

    const generateColors = (songs) => {
        if (songs === undefined || songs.length === 0) {return;}
        ratingsRange.max = undefined;
        ratingsRange.min = undefined;
        for (let song of songs) {
            song['score'] = sumRatings(song.ratings);
            if (ratingsRange.max === undefined || song.score > ratingsRange.max) {ratingsRange.max = song.score;}
            if (ratingsRange.min === undefined || song.score < ratingsRange.min) {ratingsRange.min = song.score;}
        }
        initializeRainbows();
        for (let song of songs) {
            song['color'] = getColor(song.score);
        }
    };

    useEffect(() => {
        getSongs().then((response) => {
            setSongResponse(response.data.songs);
            const thisWeek = response.data.songs[today];
            var songs = [];
            if (response.data.songs[today]) {
                songs = thisWeek.songs;
            }
            generateColors(songs);
            setCurrentSongs(songs);
            setIsLoading(false);
        })
            .catch((response) => {
                console.log(response);
                console.error('Error getting songs, using mocks'); //TODO handle error response
                const songs = mockSongs['2020-01-20'].songs;
                generateColors(songs);
                setCurrentSongs(songs); //TODO get actual week
                setIsLoading(false);
            });
    }, []);

    const updateRating = useCallback((songName, songRater, value) => {
        let newSongs = [...currentSongs];
        for (let song of newSongs) {
            if (song.name===songName) {
                song['ratings'][songRater] = value;
                song['score'] = sumRatings(song['ratings']);
                break;
            }
        }
        saveSongs({
            ...songResponse,
            [today]: {
                songs: newSongs
            }
        });
        generateColors(newSongs);
        setCurrentSongs(newSongs);
    }, [generateColors, setCurrentSongs, currentSongs, sumRatings, saveSongs]);

    const sortSongs = useCallback(({ type, factor, field })=> {
        let newSongs = [...currentSongs];
        if (!type.includes('numerical')) {
            newSongs.sort((a,b)=> {
                if (a[field] > b[field]) {return factor * 1;}
                if (a[field] < b[field]) {return factor * -1;}
                return 0;
            });
        }
        else {
            if (field === 'total') {
                newSongs.sort((a,b)=> {
                    if (a['score'] > b['score']) {return factor * 1;}
                    if (a['score'] < b['score']) {return factor * -1;}
                    return 0;
                });
            }
            else {
                newSongs.sort((a,b)=> {
                    if (a['ratings'][field] > b['ratings'][field]) {return factor * 1;}
                    if (a['ratings'][field] < b['ratings'][field]) {return factor * -1;}
                    return 0;
                });
            }
        }
        setCurrentSongs(newSongs);
    }, [currentSongs, setCurrentSongs]);

    const addSong = useCallback((name, owner) => {
        const newSongs = [...currentSongs];
        const ratings = names.reduce((acc, name) => ({ ...acc, [name]: 0 }, {}));
        newSongs.push({
            name,
            owner,
            date: new Date(),
            ratings,
            id: uuidv4(),
        });
        setCurrentSongs(newSongs);
        console.log(today);
        saveSongs({
            ...songResponse,
            [today]: {
                songs: newSongs
            }
        }).then(() => {
            console.log('succesfully saved new songs');
        }).catch(() => {
            console.error('Error getting songs'); //TODO handle error response
        });
    }, [currentSongs, setCurrentSongs]);

    const removeSong = useCallback((index) => {
        const newSongs = [...currentSongs];
        newSongs.splice(index, 1);
        setCurrentSongs(newSongs);
        saveSongs({
            ...songResponse,
            [today]: {
                songs: newSongs
            }
        }).then(() => {
            console.log('succesfully saved new songs');
        }).catch(() => {
            console.error('Error saving songs'); //TODO handle error response
        });
    }, [currentSongs, setCurrentSongs]);

    const changeSong = useCallback((index, variableName, variableValue) => {
        const newSongs = [...currentSongs];
        newSongs[index][variableName] = variableValue;
        setCurrentSongs(newSongs);
    }, [currentSongs, setCurrentSongs]);

    const saveCurrentSongs = useCallback(() => {
        saveSongs({
            ...songResponse,
            [today]: {
                songs: currentSongs
            }
        }).then(() => {
            console.log('succesfully saved new songs');
        }).catch(() => {
            console.error('Error getting songs, using mocks'); //TODO handle error response
        });
    }, [currentSongs, setCurrentSongs]);

    const kickOffWeek = useCallback(() => {
        const lastWeek = getDateString(subtractDays(getDateFromDateString(today), 7));
        console.log(lastWeek);
        const thisWeek = songResponse[lastWeek];
        var songs = [];
        if (thisWeek) {
            songs = thisWeek.songs;
        }
        generateColors(songs);
        setCurrentSongs(songs);
        saveCurrentSongs();
    }, [songResponse, setCurrentSongs, generateColors]);

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            <AddSongDialog
                isOpen={addSongModalOpen}
                handleClose={() => setAddSongModalOpen(false)}
                addSong={addSong}
                users={names}
            />
            <Card className={classes.mainCardContainer}>
                <CardContent>
                    <Typography variant="h2" component="h2">
                    Music For You
                    </Typography>
                    <div>
                        <TextField
                            type="date"
                            defaultValue={today}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => {
                                const monday = getMonday(event.target.value);
                                navigate(`?date=${monday}`);
                                setToday(monday);
                                window.location.reload(false);
                            }}
                        />
                        <Tooltip title="Date will always be converted to the monday of the given week." placement="top-start">
                            <Help/>
                        </Tooltip>
                        <Button
                            disabled={currentSongs.length > 0}
                            onClick={() => kickOffWeek()}
                        >
                            Kick Off Week
                        </Button>
                        <Tooltip title="Imports songs from previous week. Only available if there are no songs in current week." placement="top-start">
                            <Help/>
                        </Tooltip>
                        <Button
                            onClick={() => navigate(`/listConfiguration?id=${id}`)}
                        >
                            List Configuration
                        </Button>
                    </div>
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
                                            <span className={classes.cellHeaderContainer}>
                                                <span className={classes.cellHeaderText}>{name}</span>
                                                <SortingDropdown sortSongs={sortSongs} owner={name.toLowerCase()}/>
                                            </span>
                                        </TableCell>
                                    )}
                                    <TableCell style={{backgroundColor: '#fbbc04'}}>
                                        <span className={classes.cellHeaderContainer}>
                                            <span className={classes.cellHeaderText}>Total</span>
                                            <SortingDropdown sortSongs={sortSongs} owner={'total'}/>
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentSongs.map((song, index) => 
                                    <MusicRow
                                        key={index}
                                        updateRating={updateRating}
                                        removeSong={() => removeSong(index)}
                                        song={song}
                                        changeSong={(variableName, variableValue) => changeSong(index, variableName, variableValue)}
                                        saveCurrentSongs={saveCurrentSongs}
                                    />
                                )}
                                <TableRow>
                                    <TableCell>
                                        <Button onClick={() => setAddSongModalOpen(true)}>+</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    );
}

export default withStyles(useStyles)(MusicTable);