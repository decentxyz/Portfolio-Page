import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MintButton from "../components/MintButton";

const Home: NextPage = () => {
  return (
    <div className={`${styles.container} background`}>
      <Head>
        <title>Mint J Dilla Anthology</title>
        <meta
          name="description"
          content='Custom mint site by decent.xyz for fans to mint NFTs from the J Dilla collection.'
        />
        <link rel="icon" href="/images/icon.png" />
      </Head>

      <main className={`${styles.main} lg:mx-20 mx-10`}>
        <div className='mt-12'>
          <h1 className={`${styles.title} font-bold`}>
            The Official J Dilla Legacy Collection
          </h1>
          <div className={`${styles.description} text-center`}>
            {`The J Dilla Legacy Collection is a web3 digital collection that creates a new way to experience the musical impact of J Dilla. It includes some of the most iconic artwork made by renowned artist Desiree Kelly, exclusive physical collectors items, and interactive music collectibles that cannot be found anywhere else. All of this will lead to an ultimate music Block Party experience in the metaverse. The collection is designed to give fans a glimpse into the life and work of one of hip-hop's most influential artists curated through the eyes of the person who knew him best - his mother, Ma Dukes.`}
          </div>
        </div>

        <div className={`${styles.grid} cursor-pointer`}>
          <MintButton chainId={5} contractAddress={"0xe2597C2CdfA09c49757Fd20094A73F85b02baB87"} price={'.05'} />
        </div>
      </main>

      <footer className='py-8 border-t border-white text-white'>
        <div>
        <p className='flex justify-center pb-4 text-xl'>For the artists of every industry 🥂</p>
        <a className='flex justify-center items-center text-xl' href="https://decent.xyz" target="_blank" rel="noopener noreferrer">
         <span className='pr-4'>🏗️</span> 
        <Image src='/images/decent.png' height={18} width={100} alt='Decent 💪' />
        </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
