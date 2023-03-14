import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getReleases } from '../lib/GetReleases';
import NFTCard from '../components/NFTCard';

const Home: NextPage = () => {
  const [NFTs, setNFTs] = useState<any[]>([]);
  const [sum, setSum] = useState(0);
  const projectSymbol1 = "RCGS1";
  const projectSymbol2 = "RBEP1";

  useEffect(() => {
    async function loadData() {
      let nfts = await getReleases(projectSymbol1, projectSymbol2)
      if (nfts && nfts.length > 0) {
        let sorted = nfts.sort((a,b) => b.data.totalSupply - a.data.totalSupply);
        let total = nfts.reduce((acc, curr) => acc + curr.data.totalSupply, 0);
        setNFTs(sorted);
        setSum(total);
      }
    }
    loadData();
  }, []);

  return <>
    <div className={`${styles.container} min-h-screen`}>
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
        <div className='pb-8 px-12 text-lg'>
          <h1 className='w-full sm:text-5xl text-3xl pb-4'>Reveel Creator Grants Submissions</h1>
          <p className="text-violet-500 font-[500]">The Reveel Creator Grants Competition has ended. Let us know what you would like to see next on this page!</p>
          <p className='py-2'>Total Votes: <b>{sum}</b></p>
          <p>Current Grant Recipients:
          <p className='py-2 text-sm'>Note: Each wallet can only register a maximum of 10 votes. Count authenticity will be evaluated at the end of the competition.</p>
            {NFTs.length > 0 &&
            <ul className='pl-4'>
              <li>1. <b>{NFTs[0]?.data.name}</b>: <span className='text-violet-500'>$4,000 USDC</span></li>
              <li>2. <b>{NFTs[1]?.data.name}</b>: <span className='text-violet-500'>$750 USDC</span></li>
              <li>3. <b>{NFTs[3]?.data.name}</b>: <span className='text-violet-500'>$250 USDC</span></li>
            </ul>
            }
          </p>
        </div>
        <div className='flex flex-wrap gap-12 justify-center pt-8'>
          {NFTs.map((nft, i) => {
            return (
              <div key={i} className='relative'>
                <NFTCard
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
                <p className="absolute top-4 left-4 text-2xl text-white font-bold">{i+1}</p>
              </div>
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
