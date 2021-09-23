import React, { useState } from "react";

import { ListFur } from "../data/koalaMetaDecoder";
import { FurKey } from "../data/koalaMetaDecoder";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const MockState = [
    {
        "tokenID": "1337",
        "fur": "Grey",
        "role": "Smart",
        "head": "pirate hat",
        "mouth": "testing"
    },
    {
        "tokenID": "42",
        "fur": "Grey",
        "role": "Smart",
        "head": "pirate hat",
        "mouth": "testing"
    }
]

export default function SerachBox() {

    const [searchMeta, setSearchMeta] = useState(MockState);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    function queryFur(id) {
        fetch("http://localhost:3015/fur?id=" + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSearchMeta(data);
            })
    }

    return (
        <>
            <h2>Walla-Watch!</h2>

            <h3>Recently Listed Wallas</h3>

            <div Style="border: 1px solid black">
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Select Walla Traits!
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Fur" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open}
                        timeout="auto"
                        collapsedSize="0px"
                        unmountOnExit>
                        <List component="div" disablePadding>
                            {ListFur.map((furdata) =>
                                <>
                                    <ListItemButton sx={{ pl: 4 }} onClick={() => queryFur(furdata.id)}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary={furdata.text} />
                                    </ListItemButton>
                                </>
                            )}
                        </List>
                    </Collapse>
                </List>
            </div>

            <br />
            <h2> Result </h2>
            <br />

            {searchMeta.map(data =>
                <>
                    <div Style="border: 1px solid black;
                      width: 250px;
                      height: 250px;
                      margin-left: 30px;
                      padding: 15px;"
                    >
                        <p> TokenID: {data.tokenID} </p>
                        <p> Fur: {data.fur} -> {FurKey[data.fur]}</p>
                        <p> role: {data.role} </p>
                        <p> head: {data.head} </p>
                        <p> mouth: {data.mouth} </p>
                        <p> role: {data.role} </p>
                    </div>
                    <br />
                </>
            )}
        </>
    );
}

