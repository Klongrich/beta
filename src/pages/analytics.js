import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { local } from "web3modal";

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

    //Move to JSON object instead of consts
    const [wallaFloor, setWallaFloor] = useState(13.37);
    const [pudgyFloor, setPudgyFloor] = useState(4.2);
    const [sappyFloor, setSappyFloor] = useState(0.42);
    const [boredApeFloor, setBoredApeFloor] = useState(0.1337);

    async function getRecentListings() {
        fetch('https://api.opensea.io/api/v1/events?asset_contract_address=0x3f5fb35468e9834a43dca1c160c69eaae78b6360')
            .then(res => res.json())
            .then(data => {
                console.log(data.asset_events);
                setRecentListings(data.asset_events);
            })
    }

    //Scraps the fucking html and parses the floor price .... thank you so much open-sea.
    async function ifThisWorksLOL(Collection, setVar) {
        fetch('https://opensea.io/collection/' + Collection)
            .then(res => res.text())
            .then(data => {
                let temp = data.split("floorPrice");
                let temp2 = temp[1].split(",");
                localStorage.setItem(Collection, temp2[0].slice(2, 6));
                setVar(temp2[0].slice(2, 6));
            })
    }

    //Set to update local stroage and floor only every 5 min - 10 min
    async function LocalStorageManagment() {
        //300 - 600 = 5 - 10 mins in unix time
        var lastCached = localStorage.getItem('time_stamp')
        var timeStamp = Math.floor(Date.now() / 1000);

        var timeSinceLastSave = timeStamp - lastCached;

        if (timeSinceLastSave > 300 || !lastCached) {
            await ifThisWorksLOL("pudgypenguins", setPudgyFloor);
            await ifThisWorksLOL("koala-intelligence-agency", setWallaFloor);
            await ifThisWorksLOL("sappy-seals", setSappyFloor);
            await ifThisWorksLOL("boredapeyachtclub", setBoredApeFloor);

            localStorage.setItem('time_stamp', timeStamp);
        }

        setPudgyFloor(localStorage.getItem('pudgypenguins'))
        setWallaFloor(localStorage.getItem("koala-intelligence-agency"));
        setSappyFloor(localStorage.getItem("sappy-seals"));
        setBoredApeFloor(localStorage.getItem('boredapeyachtclub'));
    }

    useState(() => {
        LocalStorageManagment();
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