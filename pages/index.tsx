import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MintButton from "../components/MintButton";
import Link from 'next/link';
import { DecentSDK, edition } from "@decent.xyz/sdk";
import { ethers } from "ethers";
import MarketplaceButtons from '../components/MarketplaceButtons';

const Home: NextPage = () => {
  const RPC = "https://ethereum-goerli-rpc.allthatnode.com"; //for testing on Ethereum goerli; do not need for mainnet - other chains have different RPC endpoints you'll have to input here if contract is not on Ethereum mainnet

  const CHAINID = 1; //change to 5 to test on goerli
  
  {/* make sure to update for your contract address; if you created your contract through the HQ, you can grab its address off the Success or Admin page */}
  const contractAddress = '0x5eB804cf3f0c6f97e99631961A53bCad2bbA4851';
  {/* can be deleted if only using 1 contract */}

  const [contractMints, setContractMints] = useState(0);
  
  // required to display the mint counts you'll see below || can add any other contract data via a similar method
  const updateContractInfo = async () => {
    const provider = ethers.getDefaultProvider(); //add RPC as parameter for goerli
    const sdk = new DecentSDK(CHAINID, provider);
    const contract = await edition.getContract(sdk, contractAddress);

    setContractMints(parseInt(await contract.totalSupply()));
  }

  // for batch minting
  const [anthologyQuantity, setAnthologyQuantity] = useState(1);

  const openseaLink:string = "j-dilla-anthology";

  useEffect(() => {
    updateContractInfo();
  }, []);

  return (
    <div className={`${styles.container} background`}>
      {/* set metadata; reminder to also clear out the Burble images from public/images */}
      <Head>
        <title>Mint Decent</title>
        <meta
          name="description"
          content='Custom mint site by decent.xyz for creators to easily deploy extermely customizable minting sites.'
        />
        <link rel="icon" href="/images/decent-icon.png" />
      </Head>

      <main className={`${styles.main}`}>
        <div className='lg:flex items-start lg:gap-20 gap-12 lg:mt-20 mt-12'>
          {/* make sure to update the images, contract information & most importantly (!) mint button props in the section below */}
          {/* in most cases, you will likely only have 1 contract that needs minting so just use the first container and delete the next two */}
          <div className='lg:max-w-1/2 w-full lg:mx-20'>
            <h1 className={`${styles.title} font-[600]`}>J Dilla Legacy Collection</h1>
            <div className={`${styles.description} font-[300]`}>
              {`The J Dilla Legacy Collection is a web3 digital collection that creates a new way to experience the musical impact of J Dilla. It includes some of the most iconic artwork made by renowned artist Desiree Kelly, exclusive physical collectors items, and interactive music collectibles that cannot be found anywhere else.`}
            </div>
            <div className='px-10 w-72 space-y-1 p-2 border border-white rounded-md'>
              <div className='grid grid-cols-2'><p>Price:</p><p className='text-right'>0.05 ETH</p></div>
              <div className='grid grid-cols-2'><p>Minted:</p><p className='text-right'>{contractMints} / 3,333</p></div>
            </div>
          </div>

          <div className='flex w-full justify-center mt-12 lg:mt-0'>
            <div className='text-center space-y-3 w-96'>
              <div className='h-96 relative'>
                <div style={{ height: "100%", width: "100%" }}>
                  <Image className="rounded-lg drop-shadow-lg" src="/images/crosswords.png" object-fit="contain" fill alt={'crosswords'} />
                </div>
              </div>
              <MintButton chainId={CHAINID} contractAddress={contractAddress} price={.05} setQuantity={setAnthologyQuantity} quantity={anthologyQuantity} openseaLink={openseaLink} />
              <MarketplaceButtons openseaLink={openseaLink} contractAddress={contractAddress} />
            </div>
          </div>
        </div>
      </main>

      {/* would appreciate the footer s/o but do what you will 🤝 */}
      <footer className='py-8 border-t border-white text-white justify-center flex items-center'>
       <p className='pr-2 tracking-widest text-sm font-[400]'>Powered by </p>
       <Link href="http://decent.xyz/" className='pt-1'>
          <Image src='/images/decent.png' height={12} width={85} alt='Decent 💪' />
        </Link>
      </footer>
    </div>
  );
};

export default Home;