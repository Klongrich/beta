import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Web3 from "web3";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import MintingFactory from "./pages/minting_factory";
import ViewAssests from "./pages/view_assests";

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

  const [addressSet, updateAddressSet] = useState(false);

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
      updateAddressSet(true);

      console.log("Set as Address: " + EthAccounts[0])
    } else {
      console.log("web3 not found");
    }
  }

  useEffect(async () => {
    await loadWeb3();
  }, [])

  //Could use React Router instead of using condtional rending as componets
  return (
    <>
      {/* Rending Header Here For Now */}
      <h2> Welcome to the AvonNFT MarketPlace!</h2>

      <div>
        <ul>
          <li> Home </li>
          <li> Trade </li>
          <li onClick={() => setView("ViewAssests")}> View Assests </li>
          <li onClick={() => setView("Mint")}> Mint NFTs</li>
          <li> Search </li>
        </ul>
      </div>
    
      {view == "Mint" && <MintingFactory web3={web3} /> }
      {view == "ViewAssests" && addressSet &&  <ViewAssests address={userAddress} /> }
    
    </>
  );
}

export default App;
