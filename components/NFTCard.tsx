import Image from "next/image";
import Link from "next/link";
import MintButton from "./MintButton";
import NFTMedia from "./NFTMedia";
import getIpfsLink from "../lib/getIpfsLink";
import getChainIcon from "../lib/getChainIcon";

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
        <NFTMedia ipfsImage={image} ipfsAnimation={animationUrl} mimeType={mimeType} />
      </div>
      <div className="absolute bottom-0 left-2 w-[344px] bg-white text-black opacity-80 h-fit px-4 pt-2 mb-2 rounded-md">     
        <p className="text-2xl font-[500] pr-4 truncate">{name}</p>
        <div className="flex justify-between items-center">
          <p className="tracking-widest">{creator}</p>
          <Link className="flex gap-2" href={`https://hq.decent.xyz/${chainId}/${contractType}/${contractAddress}`}>
            <span className="text-sm">View on</span>
            <Image className="pt-1 hover:drop-shadow-md" src='/images/gradient-logo.png' height={20} width={20} alt='Decent' />
          </Link>
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex items-center gap-1">
            <p className="text-sm">Price:</p><p className="font-[500]"> {tokenPrice} ETH</p>
            <Image width={18} height={18} src={getChainIcon(chainId)} alt="chain" />
          </div>
          <p><span className="text-sm">Minted:</span><span className="font-[500]"> {mintCount}</span></p>
        </div>
        <MintButton chainId={chainId} contractAddress={contractAddress} price={tokenPrice} quantity={1} />
        {mimeType.includes('audio') &&
          <audio
            controls
            src={getIpfsLink(animationUrl)}
            className="h-4 my-1"
          ></audio>
          }
      </div>
    </div>
  </>
}

export default NFTCard;