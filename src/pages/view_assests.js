import React, {useState, useEffect} from "react";
import styled from "styled-components";

const ImageBox = styled.div`
    height: 300px;
    width: 300px;
    padding: 20px;
    
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid black;
    display: inline-block;
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
            {userNFTs.map((data) => 
                <>
                    <ImageBox>
                        <p> Name: {data.name}</p>
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