import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import MarketplaceButtons from '../components/MarketplaceButtons';
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

  return (
    <div className={`${styles.container} background`}>
      {/* set metadata; reminder to also clear out the Burble images from public/images */}
      <Head>
        <title>Mint Decent</title>
        <meta
          name="description"
          content='Custom mint site by decent.xyz for creators to easily deploy customizable minting sites.'
        />
        <link rel="icon" href="/images/decent-icon.png" />
      </Head>

      <main className={`${styles.main}`}>
        <div className='flex flex-wrap gap-8'>
          {NFTs.slice(0,2).map((nft, i) => {
            return (
              <NFTCard
                key={i}
                contractAddress={nft.address}
                chainId={nft.chainId}
                creator={nft.creator?.ensName || nft.creator?.address}
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