import React, {useEffect, useState} from "react";
import Web3 from "web3";

import styled from "styled-components";
import { NFTStorage} from "nft.storage";

const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQwOTAzNzkxMTE2Mzc4QzFhMzQzQWNEOTlkODM5QTVjOUNEMTkwZDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMjM0MzExMzE0NCwibmFtZSI6Ik1ldGFDYXJkcyJ9.nxK3qwZzikTkvwRqyHAVTPn4ycHW40xFatYM6S2vOZk" });

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

function App() {

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [metaName, setMetaName] = useState("Enter Name");
  const [metaDiscrtiption, setMetaDiscription] = useState("Enter Description");

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      return true;
    } else {
      return false;
    }
  }

  async function submit_data(){
    const metadata = await client.store({
      name: metaName,
      description: metaDiscrtiption,
      image: new File([image], 'testing.png', { type: 'image/png' }),
      attributes : [
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
  }

  useEffect(() => {
    loadWeb3();
  }, [])

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
              <img style={{width: 500, height: 500}} src={previewImage} /> 
            </div>

            <br />
            <br />

            <h3>  Name:  <br /> {metaName} </h3>
            <h3> Discrtiption: <br /> {metaDiscrtiption} </h3>
          </PreviewContainer>

          <button onClick={() => submit_data()}>
                Mint NFT ->
            </button>
          <br />
          <br />
    </>
  );
}

export default App;
