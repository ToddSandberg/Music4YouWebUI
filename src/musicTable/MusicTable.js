import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function MusicTable() {
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
                <TableCell>Todd</TableCell>
                <TableCell>Tayro</TableCell>
                <TableCell>Alex</TableCell>
                <TableCell>Sneh</TableCell>
                <TableCell>Grant</TableCell>
                <TableCell>Emma</TableCell>
                <TableCell>Tanner</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={1}>
                <TableCell component="th">This is a Song</TableCell>
                <TableCell style={{backgroundColor:'green'}}>5</TableCell>
                <TableCell>5</TableCell>
                <TableCell>5</TableCell>
                <TableCell>5</TableCell>
                <TableCell>5</TableCell>
                <TableCell>5</TableCell>
                <TableCell>5</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
    </Card>
    );
}

export default MusicTable;