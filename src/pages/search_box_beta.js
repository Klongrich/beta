import React, { useState } from "react";
import styled from "styled-components";

import { ListFur } from "../data/koalaMetaDecoder";
import { FurKey } from "../data/koalaMetaDecoder";

import { ListRole } from "../data/koalaMetaDecoder";
import { RoleKey } from "../data/koalaMetaDecoder";

import { ListHead } from "../data/pudgyMetaDecoder";
import { HeadKey } from "../data/pudgyMetaDecoder";

import PudgyLogo from "../data/images/PudgyPenguinLogo.jpeg";
import KIAlogo from "../data/images/KIAlogo.png";
import SappyLogo from "../data/images/SappyLogo.jpeg";
import BAYClogo from "../data/images/BAYClogo.png";

import SearchBoxList from "../components/searchbox_list";

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
    const [furOpen, setOpen] = useState(false);
    const [roleOpen, setRoleOpen] = useState(false);

    const [headOpen, setHeadOpen] = useState(false);

    const [currentCollection, setCurrentCollection] = useState("Wallas");

    const handleFurClick = () => {
        setOpen(!furOpen);
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
                    <SearchBoxList data={[
                        {
                            toggle: handleFurClick,
                            open: furOpen,
                            primaryText: "Fur",
                            query: queryFur,
                            allIteams: ListFur
                        },
                        {
                            toggle: handleRoleClick,
                            open: roleOpen,
                            primaryText: "Role",
                            query: queryRole,
                            allIteams: ListRole
                        }
                    ]} Title="Select Walla Traits" />
                </>
            }

            {currentCollection === "Pudgys" &&
                <>
                    <SearchBoxList data={[
                        {
                            toggle: handleHeadClick,
                            open: headOpen,
                            primaryText: "Head",
                            query: queryHead,
                            allIteams: ListHead,
                        }
                    ]} Title="Select Pudgy Traits" />
                </>
            }

            <br />
            <h2> Result </h2>
            <br />

            {/* Update to list all metas! */}
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

