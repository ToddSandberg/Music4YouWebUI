
import React, { useEffect } from 'react';
import { Card, TextField, CardActionArea, Button, Chip } from '@mui/material';
import { useState } from 'react';
import { useCallback } from 'react';
import Member from './Member';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import { getListConfigurations, saveListConfiguration } from '../apis/ListConfigurationsAPI';
import { useNavigate } from 'react-router-dom';

function ListConfiguration () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const [ listConfiguration, setListConfiguration ] = useState({});
    const [ currentAdmin, setCurrentAdmin ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getListConfigurations(id).then((response) => {
            console.log(response.data);
            setListConfiguration(response.data.listConfiguration);
        }).catch((error) => {
            console.error(error);
        });
    }, [ id ]);

    const deleteMember = useCallback((memberid) => {
        const newListConfiguration = { ...listConfiguration };
        newListConfiguration.members = newListConfiguration.members.filter((member) => member.id !== memberid);
        setListConfiguration(newListConfiguration);
        saveListConfiguration(id, newListConfiguration).then(() => {
            console.log('we did it boys');
        }).catch((error) => {
            console.error(error);
        });
    }, [listConfiguration]);

    const onConfigurationChange = useCallback((variableName, value) => {
        const newListConfiguration = { ...listConfiguration };
        newListConfiguration[variableName] = value;
        setListConfiguration(newListConfiguration);
        saveListConfiguration(id, newListConfiguration).then(() => {
            console.log('we did it boys');
        }).catch((error) => {
            console.error(error);
        });
    }, [listConfiguration]);

    return (
        <div className="App">
            <header className="App-header">
                <Button
                    onClick={() => navigate(`/list?id=${id}`)}
                >
                    Go To List
                </Button>
                <h3>List Name</h3>
                <Card>
                    <TextField
                        label="List Name"
                        value={listConfiguration.name || ''}
                        onChange={(event) => onConfigurationChange('name', event.target.value)}
                    />
                </Card>
                <h3>List Members</h3>
                <Card style={{width: '100%', backgroundColor:'grey', overflow:'visible'}}>
                    {listConfiguration.members && listConfiguration.members.map((member, index) => 
                        <Member
                            key={member.id + '' + index}
                            member={member}
                            members={listConfiguration.members}
                            deleteMember={() => deleteMember(member.id)}
                            onConfigurationChange={(newMembers) => onConfigurationChange('members', newMembers)}
                        />
                    )}
                    <Card style={{ width: 250, minHeight: 150, padding: 5, margin: 5, textAlign: 'center', display: 'inline-block'}}>
                        <CardActionArea
                            onClick={() => {
                                const members = listConfiguration.members ? [ ...listConfiguration.members ] : [];
                                members.push({
                                    id: uuidv4(),
                                });
                                onConfigurationChange('members', members);
                            }}
                            style={{ minWidth: 250, minHeight: 150 }}
                        >
                            <AddIcon style={{ position: 'relative', top: '50%' }} fontSize="large" />
                        </CardActionArea>
                    </Card>
                </Card>
                <h3>Song Removal</h3>
                <Card>
                    <TextField
                        label="Song removed per week"
                        value={listConfiguration.songsRemovedPerWeek}
                        onChange={(event) => onConfigurationChange('songsRemovedPerWeek', event.target.value)}
                    />
                </Card>
                <Card>
                    <TextField
                        label="Songs per person"
                        value={listConfiguration.songsPerPerson}
                        onChange={(event) => onConfigurationChange('songsPerPerson', event.target.value)}
                    />
                </Card>
                <h3>Admin List</h3>
                <Card>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        const admins = listConfiguration.admins || [];
                        admins.push(currentAdmin);
                        onConfigurationChange('admins', admins);
                        setCurrentAdmin('');
                    }}>
                        <TextField
                            label="Admin List"
                            value={currentAdmin}
                            onChange={(event) => {
                                setCurrentAdmin(event.target.value);
                            }}
                        />
                    </form>
                </Card>
                {listConfiguration.admins &&
                    listConfiguration.admins.map((admin) => <Chip key={admin} label={admin} onDelete={() => {
                        const admins = listConfiguration.admins || [];
                        admins.splice(admins.indexOf(admin), 1);
                        onConfigurationChange('admins', admins);
                    }} />)}
            </header>
        </div>
    );
}

export default ListConfiguration;