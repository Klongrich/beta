import React from "react";

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


export default function SearchBoxList({ data, Title }) {

    return (
        <>
            <div Style="border: 1px solid black">
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            {Title}
                        </ListSubheader>
                    }
                >

                    {data.map(meta =>
                        <>
                            <ListItemButton onClick={meta.toggle}>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary={meta.primaryText} />
                                {meta.open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={meta.open}
                                timeout="auto"
                                collapsedSize="0px"
                                unmountOnExit>
                                <List component="div" disablePadding>
                                    {meta.allIteams.map((trait) =>
                                        <>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => meta.query(trait.id)}>
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText primary={trait.text} />
                                            </ListItemButton>
                                        </>
                                    )}
                                </List>
                            </Collapse>
                        </>
                    )}
                </List>
            </div>
        </>
    )
}