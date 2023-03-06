import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getReleases } from '../lib/GetReleases';
import NFTCard from '../components/NFTCard';

const Home: NextPage = () => {
  const [NFTs, setNFTs] = useState<any[]>([]);
  const projectSymbol = "RCGS1";

  useEffect(() => {
    async function loadData() {
      let nfts = await getReleases(projectSymbol)
      if (nfts && nfts.length > 0) setNFTs(nfts)
    }
    loadData();
  }, [])

  console.log(NFTs)

  return <>
    <div className={`${styles.container}`}>
      {/* set metadata; reminder to also clear out the Burble images from public/images */}
      <Head>
        <title>Mint Decent</title>
        <meta
          name="description"
          content='Custom mint site by decent.xyz for creators to easily deploy customizable minting sites.'
        />
        <link rel="icon" href="/images/decent-icon.png" />
      </Head>

      <main className='sm:pt-32 pt-20'>
        <h1 className='text-2xl font-[500] border-b border-black'>Reveel Creator Grants Submissions</h1>
        <div className='flex flex-wrap gap-8 justify-center pt-8'>
          {NFTs.map((nft, i) => {
            return (
              <NFTCard
                key={i}
                contractAddress={nft.address}
                chainId={nft.chainId}
                creator={nft.creator?.ensName || `${nft.creator?.address.slice(0, 6)}...${nft.creator?.address.slice(38, 42)}`}
                image={nft.metadata?.image}
                name={nft.data.name}
                mintCount={nft.data.totalSupply}
                type={nft.type}
                tokenPrice={nft.data.tokenPrice}
                mimeType={nft.mimeType}
                animationUrl={nft.metadata?.animation_url}
              />
            );
          })}
        </div>
      </main>
    </div>
    <footer className='mt-8 py-4 bg-black text-white justify-center flex items-center'>
    <p className='pr-2 tracking-widest text-sm font-[400]'>Powered by </p>
    <Link href="http://decent.xyz/" className='pt-1'>
        <Image src='/images/decent.png' height={12} width={85} alt='Decent 💪' />
      </Link>
    </footer>
  </>;
};

export default Home;