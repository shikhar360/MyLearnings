import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { CONTRACT_ABI, contractAddress } from "../constants/constant.js";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  // // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // // numberOfWhitelisted tracks the number of addresses's whitelisted
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  // // Cr

  const { address, isConnected } = useAccount();

  const provider = useProvider();

  const { data: signer } = useSigner();

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const addAddressToWhitelist = async () => {
    try {
      const tx = await contract.addAddressToWhitelist();
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // get the updated number of addresses in the whitelist
      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getNumberOfWhitelisted = async () => {
    try {
      const _numberOfWhitelisted = await contract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * checkIfAddressInWhitelist: Checks if the address is in whitelist
   */
  const checkIfAddressInWhitelist = async () => {
    try {
      const addressGot = address;
      console.log(addressGot);
      // call the whitelistedAddresses from the contract
      const _joinedWhitelist = await contract.whitelistedAddresses(addressGot);
      setJoinedWhitelist(_joinedWhitelist);
    } catch (err) {
      console.error(err);
    }
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      //
      if (isConnected) {
        // setWalletConnected(true);
        checkIfAddressInWhitelist();
        getNumberOfWhitelisted();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderButton = () => {
    if (isConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return <div className={styles.button}>Loading...</div>;
      } else {
        return (
          <div
            onClick={() => addAddressToWhitelist()}
            className={styles.button}
            suppressHydrationWarning
          >
            Join the Whitelist
          </div>
        );
      }
    } else {
      return (
        <div onClick={connectWallet} className={styles.button}>
          <ConnectButton />
        </div>
      );
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {numberOfWhitelisted} have already joined the Whitelist
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  );
}
