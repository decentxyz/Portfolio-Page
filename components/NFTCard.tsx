import Image from "next/image";
import Link from "next/link";
import MintButton from "./MintButton";
import NFTMedia from "./NFTMedia";

interface Card {
  contractAddress: string;
  chainId: number;
  creator: string;
  image: string;
  name: string;
  mintCount: number;
  type: string;
  tokenPrice: string;
  mimeType: string;
  animationUrl: string;
}

const NFTCard = ({contractAddress, chainId, creator, image, animationUrl, name, mintCount, type, tokenPrice, mimeType}: Card) => {

  const typeIndex = [
    ["DCNT721A", "DCNT4907A", "DCNTCrescendo", "DCNTVault", "DCNTStaking", "ZKEdition", "DCNTSoulBound"],
    ["Editions", "Rentable", "Crescendo", "Treasury", "Staking", "Editions", "Editions"]
  ];

  const active = typeIndex[0].indexOf(type);
  const contractType = typeIndex[1][active];
  
  return <>
    <div className="relative bg-white drop-shadow-md rounded-md">
      <div className="aspect-square">
        <NFTMedia ipfsImage={image} ipfsVideo={animationUrl} mimeType={mimeType} />
      </div>
      <div className="absolute bottom-0 left-2 w-[344px] bg-white text-black opacity-80 h-fit px-4 pt-2 mb-2 rounded-md">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-[500]">{name}</p>
          <Link href={`https://hq.decent.xyz/${chainId}/${contractType}/${contractAddress}`}>
            <Image className="pt-1 hover:drop-shadow-md" src='/images/gradient-logo.png' height={20} width={20} alt='Decent' />
          </Link>
        </div>
        <p className="tracking-widest">{creator}</p>
        <div className="flex justify-between pt-2">
          <p><span className="text-sm">Price:</span><span className="font-[500]"> {tokenPrice} ETH</span></p>
          <p><span className="text-sm">Minted:</span><span className="font-[500]"> {mintCount}</span></p>
        </div>
        <MintButton chainId={chainId} contractAddress={contractAddress} price={tokenPrice} quantity={1} />
      </div>
    </div>
  </>
}

export default NFTCard;