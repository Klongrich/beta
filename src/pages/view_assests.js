import React, {useState, useEffect} from "react";
import styled from "styled-components";

const ImageBox = styled.div`
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
            <h2> View Assests</h2>
            <ul>
                <li> Date Joined - 12/12/2012 </li>
                <li> Total NFT Value: $142,000 </li>
                <li> Address Balance: 42.22 ETH </li>
            </ul>
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