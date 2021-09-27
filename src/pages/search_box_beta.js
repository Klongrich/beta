import React, { useState } from "react";
import styled from "styled-components";

import { ListFur } from "../data/koalaMetaDecoder";
import { FurKey } from "../data/koalaMetaDecoder";

import { ListRole } from "../data/koalaMetaDecoder";
import { RoleKey } from "../data/koalaMetaDecoder";

import { ListHead } from "../data/pudgyMetaDecoder";
import { HeadKey } from "../data/pudgyMetaDecoder";

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

import PudgyLogo from "../data/images/PudgyPenguinLogo.jpeg";
import KIAlogo from "../data/images/KIAlogo.png";
import SappyLogo from "../data/images/SappyLogo.jpeg";
import BAYClogo from "../data/images/BAYClogo.png";

import { queryAllByRole } from "@testing-library/dom";
import { Collections } from "@mui/icons-material";

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

const SelectBarBox = styled.div`
    padding-left: 20px;
    padding-right: 20px;


    img {
        border: 1px solid grey;
        border-radius: 5px;
        margin-left: 20px;
        margin-right: 20px;

        :hover {
            background-color: grey;
        }

        padding: 5px;
    }
`

export default function SerachBox() {

    const [searchMeta, setSearchMeta] = useState(MockState);
    const [open, setOpen] = useState(false);
    const [roleOpen, setRoleOpen] = useState(false);

    const [headOpen, setHeadOpen] = useState(false);

    const [currentCollection, setCurrentCollection] = useState("Wallas");

    const handleFurClick = () => {
        setOpen(!open);
    }

    const handleRoleClick = () => {
        setRoleOpen(!roleOpen);
    }

    const handleHeadClick = () => {
        setHeadOpen(!headOpen);
    }

    function queryFur(id) {
        fetch("http://localhost:3015/fur?id=" + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSearchMeta(data);
            })
    }

    function queryRole(id) {
        fetch("http://localhost:3015/role?id=" + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSearchMeta(data);
            })
    }

    function queryHead(id) {
        fetch("http://localhost:3015/pudgy/head?id = " + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <>
            <h2>Choose Collection! </h2>

            <SelectBarBox>
                <img onClick={() => setCurrentCollection("Pudgys")} src={PudgyLogo} height={142} widht={142} alt="" />
                <img onClick={() => setCurrentCollection("Wallas")} src={KIAlogo} height={142} widht={142} alt="" />
                <img onClick={() => setCurrentCollection("Sappy Seals")} src={SappyLogo} height={142} widht={142} alt="" />
                <img onClick={() => setCurrentCollection("BAYC")} src={BAYClogo} height={142} widht={142} alt="" />
            </SelectBarBox>

            <h3>Recently Listed {currentCollection} </h3>

            {currentCollection === "Wallas" &&
                <>
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
                            <ListItemButton onClick={handleFurClick}>
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

                            <ListItemButton onClick={handleRoleClick}>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Role" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={roleOpen}
                                timeout="auto"
                                collapsedSize="0px"
                                unmountOnExit>
                                <List component="div" disablePadding>
                                    {ListRole.map((roledata) =>
                                        <>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => queryRole(roledata.id)}>
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText primary={roledata.text} />
                                            </ListItemButton>
                                        </>
                                    )}
                                </List>
                            </Collapse>

                        </List>
                    </div>
                </>
            }


            {currentCollection === "Pudgys" &&
                <>
                    <div Style="border: 1px solid black">
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Select Pudgy Traits!
                        </ListSubheader>
                            }
                        >
                            <ListItemButton onClick={handleHeadClick}>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Head" />
                                {headOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={headOpen}
                                timeout="auto"
                                collapsedSize="0px"
                                unmountOnExit>
                                <List component="div" disablePadding>
                                    {ListHead.map((data) =>
                                        <>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => queryHead(data.id)}>
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText primary={data.text} />
                                            </ListItemButton>
                                        </>
                                    )}
                                </List>
                            </Collapse>
                        </List>
                    </div>
                </>
            }


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
                        <p> role: {data.role} -> {RoleKey[data.role]} </p>
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

