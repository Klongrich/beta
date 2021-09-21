import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Filler = [
    {
        id: 0,
        data_image_url: "null",
    },
    {
        id: 1,
        data_image_url: "null",
    }
]

export default function Analytics() {

    const [recentListings, setRecentListings] = useState(Filler);

    const [wallaFloor, setWallaFloor] = useState("");
    const [pudgyFloor, setPudgyFloor] = useState("");
    const [sappyFloor, setSappyFloor] = useState("");
    const [boredApeFloor, setBoredApeFloor] = useState("");

    async function getRecentListings() {
        fetch('https://api.opensea.io/api/v1/events?asset_contract_address=0x3f5fb35468e9834a43dca1c160c69eaae78b6360')
            .then(res => res.json())
            .then(data => {
                console.log(data.asset_events);
                setRecentListings(data.asset_events);
            })
    }

    //Scraps the fucking html and parses the floor price .... thank you so much open-sea.
    async function ifThisWorksLOL(ContractAddress, setVar) {
        fetch('https://opensea.io/assets/' + ContractAddress + '/1120')
            .then(res => res.text())
            .then(data => {
                let temp = data.split("floorPrice");
                let temp2 = temp[1].split(",");
                setVar(temp2[0].slice(2, 6))
            })
    }

    useState(async () => {
        await ifThisWorksLOL("0xbd3531da5cf5857e7cfaa92426877b022e612cf8", setPudgyFloor);
        await ifThisWorksLOL("0x3f5fb35468e9834a43dca1c160c69eaae78b6360", setWallaFloor);
        await ifThisWorksLOL("0x364C828eE171616a39897688A831c2499aD972ec", setSappyFloor);
        await ifThisWorksLOL("0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", setBoredApeFloor)
        //await getRecentListings();
    }, [])

    return (
        <>
            <h2> This is The Analytics Page </h2>

            <p> Would like to add the ability to create scanners / watchers </p>

            <div Style="border-top: 1px solid black; padding-top; 10px;">
                <h2> Open-sea Floors </h2>
                <h3> Current Koala Floor - {wallaFloor} ETH </h3>
                <h4> New Listings </h4>

                {/* 
                {userNFT.map((data) =>
                    <>
                        <p> {data.asset.name} </p>
                        <img src={data.asset.image_url} height="210px;" width="210px" alt="" />
                        <p>Current Bid: {data.asset.bid_amount} </p>
                    </>
                )} */}

                <h3> Current Pudgy Penguin Floor - {pudgyFloor} ETH</h3>
                <h4> New Listings </h4>

                <h3> Current Sappy Seal Floor = {sappyFloor} ETH </h3>
                <h4> New Listings </h4>

                <h3> Current Bored Apy Yatch Club Floor = {boredApeFloor} ETH</h3>
                <h4> New Listings </h4>

            </div>
        </>
    )
}