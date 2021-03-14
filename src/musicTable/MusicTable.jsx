import React from 'react';
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

function MusicTable() {
    const currentSongs = mockSongs['2020-01-20'].songs; //TODO: get current week somehow

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
                    <TableCell>Song Names</TableCell>
                    {names.map(name => 
                        <TableCell 
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
                {currentSongs.map(song => <MusicRow song={song}/>)}
            </TableBody>
        </Table>
        </TableContainer>
        </CardContent>
    </Card>
    );
}

export default MusicTable;