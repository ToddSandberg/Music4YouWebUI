import React from 'react';
import { Dropdown } from 'react-bootstrap';

function SortingDropdown({ sortSongs }) {
    return(
        <Dropdown>
            <Dropdown.Toggle variant="secondary" style={{backgroundColor: 'white', color: 'black', border: 'none'}} id="dropdown-basic"></Dropdown.Toggle>

            <Dropdown.Menu align="right">
                <Dropdown.Item onClick={()=>sortSongs({type: 'name-alphabetical'})}>Sort A-Z</Dropdown.Item>
                <Dropdown.Item onClick={()=>sortSongs({type: 'name-alphabetical-reverse'})}>Sort Z-A</Dropdown.Item>
                <Dropdown.Item onClick={()=>sortSongs({type: 'name-alphabetical'})}>Sort by Song Owner</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default SortingDropdown;