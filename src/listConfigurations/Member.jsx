import React, { useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, IconButton, TextField } from '@mui/material';

export default function Member({ member, members, onConfigurationChange, deleteMember }) {
    const [ stateMember, setStateMember ] = useState(member);
    const [ memberName, setMemberName ] = useState(member.name);
    const [ userName, setUserName ] = useState(member.username);
    const [ color, setColor ] = useState(stateMember.color || '#FFFFFF');

    const handleMemberChange = useCallback((variableName, value) => {
        const newMember = { ...stateMember };
        // TODO check that name does not match another name
        newMember[variableName] = value;
        const remaining = members.filter((thismember) => newMember.id !== thismember.id);
        const newMembers = [
            ...remaining,
            newMember
        ];
        setMemberName(newMember.name);
        setUserName(newMember.username);
        setStateMember(newMember);
        onConfigurationChange(newMembers);
    }, [member, members, onConfigurationChange, setColor]);

    console.log('rerender');
    return (
        <Card style={{width:300, minHeight:150, padding:5, margin:5, backgroundColor:stateMember.color, display: 'inline-block', overflow:'visible', verticalAlign: 'top'}}>
            <IconButton onClick={() => deleteMember()} size="large">
                <DeleteIcon/>
            </IconButton>
            <TextField
                name="name"
                label="Member Name"
                value={memberName || ''}
                onChange={(event) => handleMemberChange('name', event.target.value)}
            />
            <br/>
            <TextField
                name="username"
                label="Member Username"
                value={userName || ''}
                onChange={(event) => handleMemberChange('username', event.target.value)}
            />
            <br/>
            <MuiColorInput
                value={color}
                onChange={(value) => {
                    setColor(value);
                    handleMemberChange('color', `#${value.hex}`);
                }}
            />
        </Card>
    );
}