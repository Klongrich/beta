import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Web3 from "web3";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import MintingFactory from "./pages/minting_factory";
import ViewAssests from "./pages/view_assests";
import HomePage from "./pages/home_page";
import Trade from "./pages/trade";

const Header = styled.div`
  ul {
    list-style-type: none;
  }

  li {
    float: left;
    padding-left: 20px;
  }

  li:hover{
    color: red;
    cursor: pointer;
  }

  height: 50px;
  
  background-color: black;
  color: white;

  padding-top: 5px;
`

const ConnectWallet = styled.div`
  background-color: #FF7500;
  border-radius: 4px;

  margin-left: 80%;
  width: 142px;
  height: 35px;
    
  p {
    text-align: center;
    margin-top: 9px;
  }

  :hover {
    background-color: #FF5A00;
    cursor: pointer;
  }

  position: absolute;
  top: 18px;
  left: 80px;
`

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: '43b86485d3164682b5d703fd1d39fe1c' // required
    }
  }
}

function App() {

  const [view, setView] = useState("Home");

  const [provider, setProvider] = useState("");
  const [web3, setWeb3] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const [addressLoaded, updateAddressLoaded] = useState(false);

  const web3Modal = new Web3Modal({
    network: 'rinkeby', // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  async function loadWeb3() {
    const provider = await web3Modal.connect();
    const web3 = await new Web3(provider);

    setProvider(provider);
    setWeb3(web3);

    if (web3) {
      console.log("we connected");
      //Janky hot fix for now ...
      const EthAccounts = await web3.eth.getAccounts();
      setUserAddress(EthAccounts[0]);
      updateAddressLoaded(true);

      console.log("Set as Address: " + EthAccounts[0])
    } else {
      console.log("web3 not found");
    }
  }

  useEffect(async () => {
    const provider = await web3Modal.connect()

    if (provider) {
      loadWeb3();
    } else {
      console.log("Not Connected!")
    }
  }, [])

  //Could use React Router instead of using condtional rending as componets
  return (
    <>
      {/* Rending Header Here For Now */}
      {/* <h2> Welcome to the NFT MarketPlace!</h2> */}

      <Header>
        <div>
          <ul>
            <li onClick={() => setView("Home")}> Home </li>
            <li onClick={() => setView("Trade")}> Trade </li>
            <li onClick={() => setView("ViewAssests")}> View Assests </li>
            <li onClick={() => setView("Mint")}> Mint NFTs</li>
            <li> Search </li>
          </ul>

          <ConnectWallet onClick={() => loadWeb3()}>
            {!addressLoaded && <p> Connect Wallet </p>}
            {addressLoaded && <p> {userAddress.substring(0, 6)} ... {userAddress.substring(36, 42)} </p>}
          </ConnectWallet>

        </div>
      </Header>

      {view == "Mint" && <MintingFactory web3={web3} />}
      {view == "ViewAssests" && addressLoaded && <ViewAssests address={userAddress} />}
      {view == "Home" && <HomePage />}
      {view == "Trade" && <Trade />}

    </>
  );
}

export default App;
