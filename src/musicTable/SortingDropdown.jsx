import React from 'react';
import { Dropdown } from 'react-bootstrap';

function SortingDropdown({ sortSongs, owner }) {
    return(
        <Dropdown>
            <Dropdown.Toggle variant="secondary" style={{backgroundColor: 'inherit', color: 'inherit', border: 'none', padding: '0px 6px'}} id="dropdown-basic"></Dropdown.Toggle>

            {owner === null ? 
                <Dropdown.Menu align="right">
                    <Dropdown.Item onClick={()=>sortSongs({type: 'name-alphabetical', factor: 1, field: "name"})}>Sort A-Z</Dropdown.Item>
                    <Dropdown.Item onClick={()=>sortSongs({type: 'name-alphabetical-reverse', factor: -1, field: "name"})}>Sort Z-A</Dropdown.Item>
                    <Dropdown.Item onClick={()=>sortSongs({type: 'owner-alphabetical', factor: 1, field: "owner"})}>Sort by Song Owner</Dropdown.Item>
                    <Dropdown.Item onClick={()=>sortSongs({type: 'owner-alphabetical-reverse', factor: -1, field: "owner"})}>Sort by Song Owner Reverse</Dropdown.Item>
                    <Dropdown.Item onClick={()=>sortSongs({type: 'date-added-old', factor: 1, field: "date"})}>Sort by New</Dropdown.Item>
                    <Dropdown.Item onClick={()=>sortSongs({type: 'date-added-new', factor: -1, field: "date"})}>Sort by Old</Dropdown.Item>
                </Dropdown.Menu>
                :
                <Dropdown.Menu align="right">
                    <Dropdown.Item onClick={()=>sortSongs({type: 'numerical-high-to-low', factor: -1, field: owner})}>Sort High to Low</Dropdown.Item>
                    <Dropdown.Item onClick={()=>sortSongs({type: 'numerical-low-to-high', factor: 1, field: owner})}>Sort Low to High</Dropdown.Item>
                </Dropdown.Menu>
            }
        </Dropdown>
    );
}

export default SortingDropdown;