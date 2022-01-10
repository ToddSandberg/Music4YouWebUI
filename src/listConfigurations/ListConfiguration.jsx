
import React, { useEffect } from 'react';
import { Card, TextField, CardActionArea } from '@material-ui/core';
import { useState } from 'react';
import { useCallback } from 'react';
import Member from './Member';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@material-ui/icons/Add';
import { getListConfigurations, saveListConfiguration } from '../apis/ListConfigurationsAPI';

function ListConfiguration () {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    // TODO get configuration
    // TODO save configuration
    const [ listConfiguration, setListConfiguration ] = useState({});

    useEffect(() => {
        getListConfigurations(id).then((response) => {
            setListConfiguration(response.data.listConfiguration);
        }).catch((error) => {
            console.error(error);
        });
    }, [ id ]);

    const deleteMember = useCallback((name) => {
        console.log('TODO Handle delete member' + name);
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
                <h3>List Name</h3>
                <Card>
                    <TextField
                        label="List Name"
                        value={listConfiguration.name}
                        onChange={(event) => onConfigurationChange('name', event.target.value)}
                    />
                </Card>
                <h3>Categories</h3>
                <Card style={{width: '100%', backgroundColor:'grey', overflow:'visible'}}>
                    {listConfiguration.members && listConfiguration.members.map((member) => 
                        <Member
                            key={member.id}
                            member={member}
                            members={listConfiguration.members}
                            deleteMember={deleteMember}
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
            </header>
        </div>
    );
}

export default ListConfiguration;