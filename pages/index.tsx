import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MintButton from "../components/MintButton";
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={`${styles.container} background`}>
      <Head>
        <title>Mint J Dilla Anthology</title>
        <meta
          name="description"
          content='Custom mint site by decent.xyz for fans to mint NFTs from the J Dilla collection.'
        />
        <link rel="icon" href="/images/burble-icon.png" />
      </Head>

      <main className={`${styles.main} lg:mx-20 sm:mx-10 xs:mx-2`}>
        <div className='mt-12'>
          <h1 className={`${styles.title} font-bold`}>
            The Official J Dilla Legacy Collection
          </h1>
          <div className={`${styles.description} text-center lg:mx-10`}>
            {`The J Dilla Legacy Collection is a web3 digital collection that creates a new way to experience the musical impact of J Dilla. It includes some of the most iconic artwork made by renowned artist Desiree Kelly, exclusive physical collectors items, and interactive music collectibles that cannot be found anywhere else. All of this will lead to an ultimate music Block Party experience in the metaverse. The collection is designed to give fans a glimpse into the life and work of one of hip-hop's most influential artists curated through the eyes of the person who knew him best - his mother, Ma Dukes.`}
          </div>
        </div>

        <div className='flex flex-wrap justify-between gap-8 justify-center'>
          <div className='text-center space-y-4 bg-white bg-opacity-10 rounded-md py-4 px-12'>
            <p className='tracking-widest text-2xl font-[600]'>J Dilla Anthology</p>
            <div className='relative w-64 h-64 drop-shadow-md'>
              <Image src="/images/crosswords.png" object-fit="contain" fill alt={'crosswords'} />
            </div>
            <MintButton chainId={5} contractAddress={"0xe2597C2CdfA09c49757Fd20094A73F85b02baB87"} price={'.05'} />
            <div className='space-y-2 w-64'>
              <p>Price: 0.05 ETH</p>
              {/* add mint count would be nice */}
              <p>Quantity: 3,333</p> 
              <p>1x Sneaker Contest Entry</p>
            </div>
          </div>

          <div className='text-center space-y-4 bg-white bg-opacity-10 rounded-md py-4 px-12'>
            <p className='tracking-widest text-2xl font-[600]'>Ruff Draft</p>
            <div className='relative w-64 h-64 drop-shadow-md'>
              <Image src="/images/dilla-picture.jpg" object-fit="contain" fill alt={'crosswords'} />
            </div>
            <MintButton chainId={5} contractAddress={"0x43d923b21b4B55fDF5a49197c56C5651561e82f7"} price={'.2'} />
            <div className='space-y-2 w-64'>
              <p>Price: 0.2 ETH</p>
              {/* add mint count would be nice */}
              <p>Quantity: 639</p> 
              <p>4x Sneaker Contest Entry</p>
              <p>Shipped poster included and authenticated on chain via QR Code</p>
            </div>
          </div>

          <div className='text-center space-y-4 bg-white bg-opacity-10 rounded-md py-4 px-12'>
            <p className='tracking-widest text-2xl font-[600]'>Ma Dukes Says</p>
            <div className='relative w-64 h-64 drop-shadow-md'>
              <Image src="/images/animation.gif" object-fit="contain" fill alt={'crosswords'} />
            </div>
            <MintButton chainId={5} contractAddress={"0xD246fA2E64208F72b698599498E296A06e634DEB"} price={'.3'} />
            <div className='space-y-2 w-64'>
              <p>Price: 0.3 ETH</p>
              {/* add mint count would be nice */}
              <p>Quantity: 444</p> 
              <p>6x Sneaker Contest Entry</p>
              <p>Shipped poster included and authenticated on chain via QR Code</p>
              <p>Hidden audio message recorded by Ma Dukes</p>
            </div>
          </div>
        </div>

        {/* <div data-tf-widget="k9cQ3bTD" data-tf-opacity="100" data-tf-iframe-props="title=J Dilla Legacy Collection Email/wallet survey"></div><iframe src="//embed.typeform.com/next/embed.js"></iframe> */}
      </main>

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
