import React, { useState } from "react";
import styled from "styled-components";

import { NFTStorage, Token } from "nft.storage";
import ERC721_ABI from "../abi/MockNFT.json";

//Should move api to .env for production. I'm just lazy ....
const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQwOTAzNzkxMTE2Mzc4QzFhMzQzQWNEOTlkODM5QTVjOUNEMTkwZDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMjM0MzExMzE0NCwibmFtZSI6Ik1ldGFDYXJkcyJ9.nxK3qwZzikTkvwRqyHAVTPn4ycHW40xFatYM6S2vOZk" });
const ContractAddress = "0x6a8e30e38cfcf81d7741100bfaed3f176140386a";

const SelectMetaContainer = styled.div`
  border: 1px solid black;
  padding-left: 30px;
  padding-bottom: 30px;


  color: #848485;
`

const PreviewContainer = styled.div`
  border: 1px solid black;
  padding-left: 30px;
  margin-top: 20px;
  margin-bottom: 20px;

  color: #848485;
`


export default function MintingFactory({ web3 }) {

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [metaName, setMetaName] = useState("Enter Name");
  const [metaDiscrtiption, setMetaDiscription] = useState("Enter Description");


  async function mint_new_token(tokenURI) {
    const Ethaccounts = await web3.eth.getAccounts();

    const Contract = new web3.eth.Contract(ERC721_ABI.abi, ContractAddress);

    console.log(Contract);

    const TokenID = 2;

    console.log("Account One: " + Ethaccounts[0]);
    console.log("TokenID: " + TokenID);
    console.log("TokenURI: " + tokenURI);


    // await Contract.methods.tokenURI(Ethaccounts[0]).call(function (error, result) {
    //   console.log(result);
    // });

    await Contract.methods.mint(Ethaccounts[0], TokenID, "https://www.google.com")
      .send({ from: Ethaccounts[0] })
      .once("receipt", (res) => {
        console.log(res);
      })

  }

  async function submit_data_to_ipfs() {
    const metadata = await client.store({
      name: metaName,
      description: metaDiscrtiption,
      image: new File([image], 'testing.png', { type: 'image/png' }),
      attributes: [
        {
          trait_type: "Rairty",
          value: "714"
        },
        {
          trait_type: "Testing",
          value: "42"
        }
      ]
    })
    console.log(metadata.url);
    mint_new_token(metadata.url);
  }

  return (
    <>

      <h1 Style="text-align: center">Welcome to the minting factory</h1>
      <SelectMetaContainer>
        <h2>
          Select Meta
          </h2>

        <h3>Name: </h3>
        <input
          type="text"
          value={metaName}
          onChange={e => setMetaName(e.target.value)}
        />

        <h3>Description: </h3>
        <input
          type="text"
          value={metaDiscrtiption}
          onChange={e => setMetaDiscription(e.target.value)}
        />

        <h3>Image: </h3>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setPreviewImage(URL.createObjectURL(file));
            setImage(file);
          }}
        />
      </SelectMetaContainer>

      <PreviewContainer>
        <h2>
          Preview
            </h2>

        <div Style="border: 1px solid black;
                        height: 500px; 
                        width: 500px;">
          <img style={{ width: 500, height: 500 }} src={previewImage} />
        </div>

        <br />
        <br />

        <h3>  Name:  <br /> {metaName} </h3>
        <h3> Discrtiption: <br /> {metaDiscrtiption} </h3>
      </PreviewContainer>

      <button onClick={() => mint_new_token("Data Filler")}>
        Mint NFT ->
            </button>
      <br />
      <br />
    </>
  );
}
