import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MintButton from "../components/MintButton";
import Link from 'next/link';
import Typeform from '../components/Typeform';
import { DecentSDK, edition } from "@decent.xyz/sdk";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const RPC = "https://ethereum-goerli-rpc.allthatnode.com"; //for testing on Ethereum goerli; do not need for mainnet - other chains have different RPC endpoints you'll have to input here if contract is not on Ethereum mainnet

  const CHAINID = 1; //change to 5 to test on goerli
  
  {/* make sure to update for your contract address; if you created your contract through the HQ, you can grab its address off the Success or Admin page */}
  const ANTHOLOGY = '0x5eB804cf3f0c6f97e99631961A53bCad2bbA4851';
  {/* can be deleted if only using 1 contract */}
  const RUFFDRAFT = '0x59aa1D3BB2C6ea9f09A16296718B62D3A4Df0782';
  const MADUKES = '0xF3C6B02F3b5482CDed898C82e08D1fa4Cf0f2D43';

  const [anthologyMints, setAnthologyMints] = useState(0);
  const [ruffdraftMints, setRuffdraftMints] = useState(0);
  const [madukesMints, setMadukesMints] = useState(0);
  
  // required to display the mint counts you'll see below
  const updateContractInfo = async () => {
    const provider = ethers.getDefaultProvider(); //add RPC as parameter for goerli
    const sdk = new DecentSDK(CHAINID, provider);
    const anthology = await edition.getContract(sdk, ANTHOLOGY);
    const ruffdraft = await edition.getContract(sdk, RUFFDRAFT);
    const madukes = await edition.getContract(sdk, MADUKES);

    setAnthologyMints(parseInt(await anthology.totalSupply()))
    setRuffdraftMints(parseInt(await ruffdraft.totalSupply()));
    setMadukesMints(parseInt(await madukes.totalSupply()));
  }

  // for batch minting
  const [anthologyQuantity, setAnthologyQuantity] = useState(1);
  const [ruffDraftQuantity, setRuffDraftQuantity] = useState(1);
  const [maDukesQuantity, setMaDukesQuantity] = useState(1);

  useEffect(() => {
    updateContractInfo();
  }, [])

  return (
    <div className={`${styles.container} background`}>
      {/* set metadata; reminder to also clear out the Burble images from public/images */}
      <Head>
        <title>Mint J Dilla Anthology</title>
        <meta
          name="description"
          content='Custom mint site by decent.xyz for fans to mint NFTs from the J Dilla collection.'
        />
        <link rel="icon" href="/images/burble-icon.png" />
      </Head>

      <main className={`${styles.main} lg:mx-20 sm:mx-10 xs:mx-2`}>
        {/* make sure to update the images, contract information & most importantly (!) mint button props in the section below */}
        {/* in most cases, you will likely only have 1 contract that needs minting so just use the first container and delete the next two */}
        <div className='mt-12 lg:mx-20 sm:mx-4'>
          <div className='text-center'>
            <p className='text-xl font-[400] uppercase tracking-widest'>The Official</p><h1 className={`${styles.title} font-[600]`}>J Dilla Legacy Collection</h1>
          </div>
          <div className={`${styles.description} text-center font-[300]`}>
            {`The J Dilla Legacy Collection is a web3 digital collection that creates a new way to experience the musical impact of J Dilla. It includes some of the most iconic artwork made by renowned artist Desiree Kelly, exclusive physical collectors items, and interactive music collectibles that cannot be found anywhere else. All of this will lead to an ultimate music Block Party experience in the metaverse. The collection is designed to give fans a glimpse into the life and work of one of hip-hop's most influential artists curated through the eyes of the person who knew him best - his mother, Ma Dukes.`}
          </div>
        </div>

        <div className='flex flex-wrap lg:justify-between gap-8 justify-center mt-10'>
          <div className='text-center space-y-3 w-80'>
            <div className='h-80 relative'>
              <div style={{ height: "100%", width: "100%" }}>
                <Image className="rounded-lg" src="/images/crosswords.png" object-fit="contain" fill alt={'crosswords'} />
              </div>
            </div>
            <p className='tracking-widest text-2xl font-[600]'>J Dilla Anthology</p>
            <MintButton chainId={CHAINID} contractAddress={ANTHOLOGY} price={.05} setQuantity={setAnthologyQuantity} quantity={anthologyQuantity} />
            <div className='space-y-1 w-full p-2 border border-white rounded-md'>
              <p>Price: 0.05 ETH</p>
              <p>Minted: {anthologyMints}/3,333</p> 
            </div>
            <div className='text-left'>
              <li>1x Sneaker Contest Entry</li>
            </div>
          </div>

          {/* can be deleted if only using 1 contract */}
          <div className='text-center space-y-3 w-80'>
            <div className='h-80 relative'>
              <div style={{ height: "100%", width: "100%" }}>
                <Image className="rounded-lg" src="/images/dilla-picture.jpg" object-fit="contain" fill alt={'dilla'} />
              </div>
            </div>
            <p className='tracking-widest text-2xl font-[600]'>Ruff Draft</p>
            <MintButton chainId={CHAINID} contractAddress={RUFFDRAFT} price={0.2} setQuantity={setRuffDraftQuantity} quantity={ruffDraftQuantity} />
            <div className='space-y-1 w-full p-2 border border-white rounded-md'>
              <p>Price: 0.2 ETH</p>
              <p>Minted: {ruffdraftMints}/639</p> 
            </div>
            <div className='text-left'>
              <li>4x Sneaker Contest Entry</li>
              <li>Shipped poster included and authenticated on chain via QR Code</li>
            </div>
          </div>

          {/* can be deleted if only using 1 contract */}
          <div className='text-center space-y-3 w-80'>
            <div className='h-80 relative'>
              <div style={{ height: "100%", width: "100%" }}>
              <Image className="rounded-md" src="/images/animation.gif" object-fit="contain" fill alt={'crosswords'} />
              </div>
            </div>
            <p className='tracking-widest text-2xl font-[600]'>Ma Dukes Says</p>
            <MintButton chainId={CHAINID} contractAddress={MADUKES} price={0.3} setQuantity={setMaDukesQuantity} quantity={maDukesQuantity} />
            <div className='space-y-1 w-full p-2 border border-white rounded-md'>
              <p>Price: 0.3 ETH</p>
              <p>Minted: {madukesMints}/444</p> 
            </div>
            <div className='text-left'>
              <li>6x Sneaker Contest Entry</li>
              <li>Shipped poster included and authenticated on chain via QR Code</li>
              <li>Hidden audio message recorded by Ma Dukes</li>
            </div>
          </div>
        </div>

        {/* can probably delete; not a bad idea to use typeform to collect email addresses / additional info from collectors though */}
        <div className='h-full w-full lg:mt-12 mt-8 flex justify-center'>
          <Typeform />
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
