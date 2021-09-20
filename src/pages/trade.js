import React, {useEffect, useState} from "react";
import styled from "styled-components";

import { ImageBox } from "./view_assests";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export const DataFiller = [
    {
      id: 0,
      data_image_url: "null",
      listed_price: "14.2",
      offers:[
          {"user1" : "1.54"},
          {"user2" : "1.23"}
      ]
    },
    {
      id: 1,
      data_image_url: "null",
      listed_price: "4.21"
    }
]

const TopCollections = ['Galaxy Eggs',
                        'Sneaky Vampire Syndicate',
                        'Cool Cats',
                        'Lazy Lions',
                        'Mutant Ape Yacht Club',
                        'CyberKongz',
                        'Bored Ape Yacht Club',
                        'Creature World',
                        'Koala Intelligence Agency',
                        'CrypToadz',
                        'World of Women',
                        'Loot',
                        'The Doge Pount',
                        'PudgyPenguins',
                        '0N1 Force',
                        'The Sevens',
                        'Sipherian Inu',
                        'Adam Bomb Squad',
                        'The Wicked Craniums',
                        'SpacePunksClub',
                        'MoonCats - Acclimated',
                        'Purrnelopes Country Club',
                        'BYOPills',
                        'Hashmasks',
                        'Forgotten Runes Wizards Cult',
                        'The Currency',
                        'Animetas',
                        'Bloot',
                        'FVCK_CRYSTAL//',
                        'The Vogu Collective',
                        'dotdotdots',
                        'treeverse',
                        'Ready Player Cat NFT',
                        'Gauntlets',
                        'CHIBI DINOS',
                        'Star Sailor Sibings',
                        'JunkYardDogs',
                        'Template'];

export default function Trade() {

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("This is the input");

    return (
        <>
            <h1> Trade </h1>
            
            {/* This Autocomplete section is copied and pasted from StackOver-Flow. */}

            <Autocomplete
                open={open}
                onOpen={() => {
                    if (inputValue) {
                        setOpen(true);
                    }
                }}
                onClose={() => setOpen(false)}
                inputValue={inputValue}
                onInputChange={(e, value, reason) => {
                    setInputValue(value);
                    if (!value) {
                        setOpen(false);
                    }   
                }}
                options={TopCollections}
                renderInput={(params) => (
                    <TextField {...params} label="Search NFT" variant="outlined" />
                )}
            />
            <br /> <br /> 
   
            {DataFiller.map((data) =>
            <>
                <ImageBox>
                    <h3 Style="margin-top: -7px;"> Name: </h3>
                    <p>Current Price: {data.listed_price} ETH </p>    
             
                    <div Style="height: 50px; 
                            width: 50px; 
                            border: 1px solid black;
                            margin-left: 120px;
                            margin-bottom: 30px;">
                    </div>
            
                    <button>
                        Buy NFT
                    </button>
                    <button>
                        Make Offer
                    </button>

                    <p>
                        Highest Offers: 1.23 ETHs
                    </p>
                </ImageBox>
            </>
            )}
        </>
    )
}