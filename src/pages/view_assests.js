import React, {useState, useEffect} from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from '@material-ui/core/styles';

export const ImageBox = styled.div`
    height: 350px;
    width: 300px;
    padding: 20px;
    
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: inline-block;

    text-align: center;

    border: 1px solid grey;
    border-radius: 5px;

    img {
        border-radius: 5px;
    }

    :hover{
        box-shadow: 0 0 10px black;
        cursor: pointer;
        transition-timing-function: ease-in;
        transition: 0.2s;
        transform: scale(1.03);
    }
`

const HeaderBox = styled.div`

    ul {
        list-style-type: none;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    li {
        float: left;
        padding-left: 24px;
    }

    background-color: grey;
    height: 142px;

    padding: 5px;
    padding-left: 15px;

    margin-bottom: 20px;
`

const AssesetFilter = styled.div`
    height: 1000px;
    width: 22%;

    float: left;
    background-color: #fcf7f7;

    border-radius: 8px;
    border: 1px solid black;

    padding-left: 18px;

    :hover {
        box-shadow: 0 0 5px black;
    }

`

const theme = createTheme({
    palette: {
      primary: {
        main: "#5a8f04"
      },
      secondary: {
        main: "#751200",
      },
      primary1:{
          main: "rgba(38, 33, 23, 0.62)"
      }
    },
  });


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

export default function View_Assests({address}) {

    const [userNFTs, setUserNFTs] = useState(Filler);

    function getCurrentAssests() {
        console.log("Before Fetch Address: " + address);
        fetch(
            // Mainnet
            // `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&owner=${userAccount}`,
            // Testnet (Rinkeby)
            // `https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&owner=${SearchAddress}`,
            `https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&owner=${address}`,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserNFTs(data.assets);

                console.log(data.assets[0])
                console.log(data.assets[0].image_url)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCurrentAssests();
    },[])


    return (
        <>
            <h1 Style="text-align: center;"> View User Assests </h1>
            
            {/* <HeaderBox>
            <h2> View Assests</h2>
            <p Style="margin-left: 140px; margin-top: -40px;">- Created On - 12/12/2012</p>
            <ul>
                <li> Total NFT Value: $142,000 </li>
                <li> Address Balance: 42.22 ETH </li>
            </ul>

            <br />
            <p>Sort By -> Collection, price, purchase date, etc ...</p>
            </HeaderBox> */}

            <AssesetFilter>
                <h2 Style="text-align: center; font-size: 30px"> Assest Filter </h2>

                <div>
                <ThemeProvider theme={theme}>
             
                    <Button style={{minWidth: '142px'}} size="large" variant="contained" color="primary">  Recent  </Button>
                    <br /> <br />
                    <Button style={{minWidth: '142px'}} size="large" variant="contained" color="primary">  On Sale </Button>
                    <br /> <br />
            

                    <div Style="text-align: right; margin-top: -120px; margin-right: 18px;">
                        <Button style={{minWidth: '142px'}} size="large" variant="contained" color="primary">  On Auction </Button>
                        <br /> <br />
                        <Button style={{minWidth: '142px'}} size="large" variant="contained" color="primary">  Has Offers </Button>
                    </div>
                </ThemeProvider>
                </div>
                
                <br />
                <div Style="border-top: 1px solid black; 
                            margin-right: 18px;
                            padding-bottom: 20px;
                            margin-top: 15px;">
                    <h2> Collection </h2>
                    <input />
                    <br /> <br />
                    <button>
                        Search
                    </button>
                </div>
                <br />
                <div Style="border-top: 1px solid black;
                            border-bottom: 1px solid black;
                            padding-bottom: 30px; 
                            margin-right: 18px;">
                    <h2>Price: $USD</h2>
                    
                    <p>Min: </p>
                    <input />
                    
                    <p>Max: </p>
                    <input />
                    <br /> <br />
                    <button>
                        Search
                    </button>
                </div>
            </AssesetFilter>

            {userNFTs.map((data) => 
                <>
                    <ImageBox>

                        <h3 Style="margin-top: -7px;"> Name: {data.name} </h3>

                        <p>Price Bought: 1.42 ETH </p>    
                        <p>Profit / Losst: <strong Style="color: green"> +$42,000 </strong> </p>

                        <img src={data.image_url} height={210} width={210} alt=""/>
                        {/* {<p>Owner: {data.owner.user.username}</p>} */}
                        {/* <p>TokenID: {data.description} </p> */}
                        {/* <p>URL Link: {data.image_url} </p> */}
                        <br /> <br />
                        <button>
                            Sell NFT
                        </button>
                    </ImageBox>
                </>
            )}
        </>
    )
}