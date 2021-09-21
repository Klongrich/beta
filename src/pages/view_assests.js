import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from '@material-ui/core/styles';

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core"

import ContractABI from "../abi/ERC721-ABI";
const ExchangeContractAddress = '0x6a8e30e38cfcf81d7741100bfaed3f176140386a';

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
        primary1: {
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

export default function View_Assests({ address, web3 }) {

    const [userNFTs, setUserNFTs] = useState(Filler);
    const [isListing, setItsListing] = useState(false);

    const [listingName, setListingName] = useState(false);
    const [listingImage, setListingImage] = useState(false);
    const [listingApproved, setListingApproved] = useState(false);
    const [listingPrice, setListingPrice] = useState(0);

    const [confrimPrice, setConfrimPrice] = useState(false);

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

    //Implement Web3-js calls
    function checkUsersWalletForApproval() {
        setListingApproved(true);
    }

    function listCurrentAssest(image, name) {
        checkUsersWalletForApproval();

        setListingName(name);
        setListingImage(image);
        setItsListing(true);
    }

    async function sendDataToEthereum() {
        const Ethaccounts = await web3.eth.getAccounts();

        const Contract = new web3.eth.Contract(ContractABI, ExchangeContractAddress);

        await Contract.methods.mint(Ethaccounts[0], 42, 'https://www.42.fr')
            .send({ from: Ethaccounts[0] })
            .once('receipt', (res) => {
                console.log(res);
            });

        console.log(`Account One: ${Ethaccounts[0]}`);
    }

    function submitListing() {
        if (listingApproved) {
            //Use Material-UI
            alert("listing is not approved!")
            return (0);
        } else if (!confrimPrice) {
            setConfrimPrice(true)
            return (0);
        } else if (confrimPrice && !listingApproved) {
            //function to submit listing with Web3-js call
            console.log("Listing nft .....");
            sendDataToEthereum();
        }
    }



    function handleToClose() {
        setItsListing(false);
        setConfrimPrice(false);
    }

    useEffect(() => {
        getCurrentAssests();
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <h1 Style="text-align: center;"> View User Assests </h1>
                <AssesetFilter>
                    <h2 Style="text-align: center; font-size: 30px"> Assest Filter </h2>
                    <div>
                        <Button style={{ minWidth: '112px' }} size="large" variant="contained" color="primary">  Recent  </Button>
                        <br /> <br />
                        <Button style={{ minWidth: '112px' }} size="large" variant="contained" color="primary">  On Sale </Button>
                        <br /> <br />
                        <div Style="text-align: right; margin-top: -120px; margin-right: 18px;">
                            <Button style={{ minWidth: '112px' }} size="large" variant="contained" color="primary">  On Auction </Button>
                            <br /> <br />
                            <Button style={{ minWidth: '112px' }} size="large" variant="contained" color="primary">  Has Offers </Button>
                        </div>
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

                            <img src={data.image_url} height={210} width={210} alt="" />
                            {/* {<p>Owner: {data.owner.user.username}</p>} */}
                            {/* <p>TokenID: {data.description} </p> */}
                            {/* <p>URL Link: {data.image_url} </p> */}
                            <br /> <br />
                            <button onClick={() => listCurrentAssest(data.image_url, data.name)}>
                                List Your NFT
                            </button>
                            <button>
                                More Info
                            </button>
                        </ImageBox>
                    </>
                )}

                <Dialog open={isListing} onClose={handleToClose}>
                    <DialogContent>
                        <div Style="width: 300px; text-align: center; padding-bottom: 30px;">
                            <DialogContentText>
                                <h2 Style="text-align: center;">List Your Item</h2>

                                <h3 Style="text-align: center;">{listingName}</h3>
                                <img Style="text-align: center;" src={listingImage} height={240} width={240} alt="" />

                                <br /> <br />
                                <TextField style={{ minWidth: "240px " }}
                                    id="outlined-basic"
                                    label="Price ETH"
                                    variant="outlined"
                                    onChange={e => setListingPrice(e.target.value)} />
                                <br /> <br />

                                {listingApproved &&
                                    <>
                                        {/* Create Function to send meta to smartcontract */}
                                        <Button onClick={() => setListingApproved(false)}
                                            style={{ minWidth: "240px" }}
                                            color="primary"
                                            variant="outlined">
                                            Approve Wallet
                                    </Button>
                                        <br /> <br />
                                    </>
                                }

                                {confrimPrice &&
                                    <>
                                        <Button>
                                            Confrim Price: {listingPrice} ETH?
                                        </Button>
                                        <br /> <br />
                                    </>
                                }

                                <Button onClick={() => submitListing()}
                                    style={{ minWidth: "240px" }}
                                    color="secondary"
                                    variant="outlined">
                                    {!confrimPrice && <> List </>}
                                    {confrimPrice && <> Confrim </>}
                                </Button>
                            </DialogContentText>
                        </div>
                    </DialogContent>
                </Dialog>
            </ThemeProvider>
        </>
    )
}