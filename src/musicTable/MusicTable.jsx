import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MusicRow from './MusicRow';
import SortingDropdown from './SortingDropdown';
import { getSongs, saveSongs } from '../apis/songsAPI';
import Rainbow from 'rainbowvis.js';
import { Button, CircularProgress, TextField, Tooltip } from '@mui/material';
import { useCallback } from 'react';
import AddSongDialog from './AddSongDialog';
import { getDateFromDateString, getDateString, getMonday, getUserDate, subtractDays } from '../helpers/TimeHelper';
import { useNavigate } from 'react-router-dom';
import { Help } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { getListConfigurations } from '../apis/ListConfigurationsAPI';

function sumRatings(ratings) {
    return Object.values(ratings).reduce((a, b) => 
        Number.isNaN(Number.parseFloat(b)) ? 0 + a: Number.parseFloat(b) + a, 0);
}
const ratingsRange = {min: undefined, max: undefined};
const rainbowRed = new Rainbow();
const rainbowGreen = new Rainbow();
rainbowRed.setSpectrum('#E06666', '#FFD666');
rainbowGreen.setSpectrum('#FFD666', '#34A853');

const initializeRainbows = () => {
    const min = ratingsRange.min;
    const max = ratingsRange.max;
    if (min === max) {
        return;
    }
    rainbowRed.setNumberRange(min, (max+min)/2); 
    rainbowGreen.setNumberRange((max+min)/2, max);
};

const getColor = (num) => {
    return num <= (ratingsRange.max+ratingsRange.min)/2 ? rainbowRed.colourAt(num) : rainbowGreen.colourAt(num);
};

const groupSongsByOwner = (songs) => {
    return songs.reduce((acc, song) => {
        if (acc[song.owner]) {
            acc[song.owner] = [ ...acc[song.owner], song ];
        } else {
            acc[song.owner] = [ song ];
        }
        return acc;
    }, {});
};

function MusicTable({ classes, username }) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ songResponse, setSongResponse ] = useState([]);
    const [ currentSongs, setCurrentSongs ] = useState([]);
    const [ listConfiguration, setListConfiguration ] = useState({});
    const [ members, setMembers ] = useState([]);
    const [ currentMember, setCurrentMember ] = useState({});
    const [ peopleColors, setPeopleColors ] = useState({});
    const [ addSongModalOpen, setAddSongModalOpen ] = useState(false);
    const [ today, setToday ] = useState(getMonday(getUserDate()));
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    const [ id ] = useState(idParam);
    const navigate = useNavigate();

    const generateColors = (songs) => {
        if (songs === undefined || songs.length === 0) {return;}
        ratingsRange.max = undefined;
        ratingsRange.min = undefined;
        for (const song of songs) {
            song.score = sumRatings(song.ratings);
            if (ratingsRange.max === undefined || song.score > ratingsRange.max) {ratingsRange.max = song.score;}
            if (ratingsRange.min === undefined || song.score < ratingsRange.min) {ratingsRange.min = song.score;}
        }
        initializeRainbows();
        for (const song of songs) {
            song.color = getColor(song.score);
        }
    };

    useEffect(() => {
        if (!id) {
            navigate('/info');
        }

        getSongs(id).then((response) => {
            if(response.data.songs) {
                setSongResponse(response.data.songs);
                const thisWeek = response.data.songs[today];
                let songs = [];
                if (response.data.songs[today]) {
                    songs = thisWeek.songs;
                }
                generateColors(songs);
                setCurrentSongs(songs);
                setIsLoading(false);
            } else {
                setCurrentSongs([]);
                setIsLoading(false);
            }
        })
            .catch((response) => {
                console.log(response);
                console.error('Error getting songs, using mocks'); //TODO handle error response
                setCurrentSongs([]);
                setIsLoading(false);
            });

        getListConfigurations(id).then((response) => {
            const newpeopleColors = [...response.data.listConfiguration.members].reduce((obj, member) => {
                obj[member.name] = member.color;
                return obj;
            }, {});
            setPeopleColors(newpeopleColors);
            setMembers([ ...response.data.listConfiguration.members ]);
            const newCurrentMember = response.data.listConfiguration.members
                .filter((member) => member.username === username)[0]; //TODO prevent from more than one member per username
            setCurrentMember(newCurrentMember);
            setListConfiguration(response.data.listConfiguration);
        }).catch((error) => {
            console.error(error);
        });
    }, [id]);

    const updateRating = useCallback((songName, songRater, value) => {
        const newSongs = [...currentSongs];
        for (const song of newSongs) {
            if (song.name===songName) {
                song.ratings[songRater] = value;
                song.score = sumRatings(song.ratings);
                break;
            }
        }
        saveSongs(id, {
            ...songResponse,
            [today]: {
                songs: newSongs
            }
        });
        generateColors(newSongs);
        setCurrentSongs(newSongs);
    }, [generateColors, setCurrentSongs, currentSongs, sumRatings, saveSongs]);

    const sortSongs = useCallback(({ type, factor, field })=> {
        const newSongs = [...currentSongs];
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
                    if (a.score > b.score) {return factor * 1;}
                    if (a.score < b.score) {return factor * -1;}
                    return 0;
                });
            }
            else {
                newSongs.sort((a,b)=> {
                    if (a.ratings[field] > b.ratings[field]) {return factor * 1;}
                    if (a.ratings[field] < b.ratings[field]) {return factor * -1;}
                    return 0;
                });
            }
        }
        setCurrentSongs(newSongs);
    }, [currentSongs, setCurrentSongs]);

    const addSong = useCallback((name, owner) => {
        const newSongs = [...currentSongs];
        const ratings = [ ...members ].map((member) => member.name).reduce((acc, name) => {
            acc[name] = 0;
            return acc;
        }, {});
        newSongs.push({
            name,
            owner,
            date: new Date(),
            ratings,
            id: uuidv4(),
        });
        setCurrentSongs(newSongs);
        console.log(today);
        saveSongs(id, {
            ...songResponse,
            [today]: {
                songs: newSongs
            }
        }).then(() => {
            console.log('succesfully saved new songs');
        }).catch(() => {
            console.error('Error getting songs'); //TODO handle error response
        });
    }, [currentSongs, setCurrentSongs, id, members]);

    const removeSong = useCallback((index) => {
        const newSongs = [...currentSongs];
        newSongs.splice(index, 1);
        setCurrentSongs(newSongs);
        saveSongs(id, {
            ...songResponse,
            [today]: {
                songs: newSongs
            }
        }).then(() => {
            console.log('succesfully saved new songs');
        }).catch(() => {
            console.error('Error saving songs'); //TODO handle error response
        });
    }, [currentSongs, setCurrentSongs, id]);

    const changeSong = useCallback((index, variableName, variableValue) => {
        const newSongs = [...currentSongs];
        newSongs[index][variableName] = variableValue;
        setCurrentSongs(newSongs);
    }, [currentSongs, setCurrentSongs]);

    const saveCurrentSongs = useCallback(() => {
        saveSongs(id, {
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
        const lastWeekSongs = songResponse[lastWeek];
        const thisWeek = [];
        const songsToRemove = listConfiguration.songsRemovedPerWeek;
        // group by user
        const grouped = groupSongsByOwner(lastWeekSongs.songs);
        Object.values(grouped).forEach(groupedSongs => {
            const factor = -1;
            // sort by rating
            groupedSongs.sort((a,b)=> {
                if (a.score > b.score) {return factor * 1;}
                if (a.score < b.score) {return factor * -1;}
                return 0;
            });
            // remove songs and add to this week
            for (let songNum=0; songNum < groupedSongs.length - songsToRemove; songNum++) {
                console.log(groupedSongs[songNum]);
                thisWeek.push(groupedSongs[songNum]);
            }
        });
        
        let songs = [];
        if (thisWeek) {
            songs = thisWeek;
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
                users={members}
            />
            <Card style={{width: '75%'}}>
                <CardContent>
                    <Typography variant="h2" component="h2">
                        {listConfiguration.name}
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
                                navigate(`?id=${id}&date=${monday}`);
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
                                    <TableCell>
                                        <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <span style={{marginRight: '20px'}}>Songs</span>
                                            <SortingDropdown sortSongs={sortSongs} owner={null}/>
                                        </span>
                                    </TableCell>
                                    {members.map(member => 
                                        <TableCell 
                                            key={member.id}
                                            component="th"
                                            style={{backgroundColor:peopleColors[member.name]}}
                                        >
                                            <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <span style={{marginRight: '20px'}}>{member.name}</span>
                                                <SortingDropdown sortSongs={sortSongs} owner={member.name}/>
                                            </span>
                                        </TableCell>
                                    )}
                                    <TableCell style={{backgroundColor: '#fbbc04'}}>
                                        <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <span style={{marginRight: '20px'}}>Total</span>
                                            <SortingDropdown sortSongs={sortSongs} owner={'total'}/>
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentSongs.map((song, index) => 
                                    <MusicRow
                                        key={`musicRow-${index}`} 
                                        updateRating={updateRating}
                                        removeSong={() => removeSong(index)}
                                        song={song}
                                        changeSong={(variableName, variableValue) => changeSong(index, variableName, variableValue)}
                                        saveCurrentSongs={saveCurrentSongs}
                                        members={members}
                                    />
                                )}
                                <TableRow>
                                    <TableCell>
                                        <Button
                                            disabled={currentMember?.name
                                                            && groupSongsByOwner(currentSongs)[currentMember.name]
                                                            && groupSongsByOwner(currentSongs)[currentMember.name].length >= listConfiguration.songsPerPerson}
                                            onClick={() => setAddSongModalOpen(true)}
                                        >
                                            +
                                        </Button>
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

export default MusicTable;