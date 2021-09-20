import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from '@material-ui/core/styles';

import { ImageBox } from './view_assests';

import KIAdata from './test_collections/koala.json';
import PUDYdata from './test_collections/pudgy.json';
import BAYCdata from './test_collections/bayc.json';

const theme = createTheme({
  palette: {
    primary: {
      main: "#5a8f04"
    },
    secondary: {
      main: "#751200",
    }
  },
});

export const DataFiller = [
  {
    id: 0,
    data_image_url: 'null',
    listed_price: '14.2',
    offers: [
      { user1: '1.54' },
      { user2: '1.23' },
    ],
  },
  {
    id: 1,
    data_image_url: 'null',
    listed_price: '4.21',
  },
];

const FilterBox = styled.div`
  margin-top: 30px;
  padding-left: 10px;
`

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
  'Template',
  'CryptoPunks',
  'Deafbeef'];

export default function Trade() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [status, setStatus] = useState('home');

  function Check_Collection_Input(collection) {
    console.log(`collection matching value: ${collection}`);

    if (collection == 'PudgyPenguins') {
      setStatus('PUDGY');
    } else if (collection == 'Koala Intelligence Agency') {
      setStatus('KIA');
    } else if (collection == 'Bored Ape Yacht Club') {
      setStatus('BAYC');
    } else {
      setStatus('Home');
    }
    setOpen(false);
  }

  return (
    <>
      <h1> Trade </h1>

      <Autocomplete
        open={open}
        onOpen={() => {
          if (inputValue) {
            setOpen(true);
          }
        }}
        inputValue={inputValue}
        onInputChange={(e, value) => {
          setInputValue(value);
          if (!value) {
            setOpen(false);
          }
        }}
        onChange={(e, value) => {
          Check_Collection_Input(value);
        }}
        options={TopCollections}
        renderInput={(params) => (
          <TextField {...params} label="Search NFT" variant="outlined" />
        )}
      />

      <FilterBox>
        <h2> Filters </h2>
        <ThemeProvider theme={theme}>
          <Button style={{ marginRight: '38px' }} variant="outlined" color="primary">
            BUY NOW
          </Button>

          <Button style={{ marginRight: '38px' }} variant="outlined" color="secondary" >
            LOWEST PRICE
          </Button>

          <Button style={{ marginRight: '38px' }} variant="outlined" color="primary" >
            RARITY
          </Button>

          <Button style={{ marginRight: '38px' }} variant="outlined" color="secondary" >
            SALE DATE
          </Button>
        </ThemeProvider>
      </FilterBox>

      <br />
      {' '}
      <br />

      {status == 'PUDGY' && PUDYdata.map((data) => (
        <>
          <ImageBox>
            <h3 Style="margin-top: -7px;">
              {' '}
              Name:
              {data.name}
            </h3>
            <p>Current Price: 1.42 ETH </p>

            <img src={data.image} height={210} width={210} alt="" />

            <br />
            {' '}
            <br />
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
      ))}

      {status == 'KIA' && KIAdata.map((data) => (
        <>
          <ImageBox>
            <h3 Style="margin-top: -7px;">
              {' '}
              Name:
              {data.name}
            </h3>
            <p>Current Price: 1.42 ETH </p>

            <img src={data.image} height={210} width={210} alt="" />

            <br />
            {' '}
            <br />
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
      ))}

      {status == 'BAYC' && BAYCdata.map((data) => (
        <>
          <ImageBox>
            <h3 Style="margin-top: -7px;">
              {' '}
              Name:
              {data.name}
            </h3>
            <p>Current Price: 1.42 ETH </p>

            <img src={data.image} height={210} width={210} alt="" />

            <br />
            {' '}
            <br />
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
      ))}
    </>
  );
}
