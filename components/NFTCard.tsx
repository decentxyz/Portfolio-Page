import Image from "next/image";
import Link from "next/link";
import getIpfsLink from "../lib/getIpfsLink";
import MintButton from "./MintButton";

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
    <div className="relative">
      {mimeType.includes("video") ?
        <video height={400} width={400} controls src={getIpfsLink(animationUrl)}></video> :
        <Image className="rounded-md" src={getIpfsLink(image)} alt={name} width={400} height={400} />
      }
      <div className="absolute bottom-0 w-full">
        <p>{name}</p>
        <p>{creator}</p>
        <p>{mintCount}</p>
        <p>{tokenPrice}</p>
        <p>{contractAddress}</p>
        <p>{mimeType}</p>
        <Link href={`https://hq.decent.xyz/${chainId}/${contractType}/${contractAddress}`}>
          <p className="items-center flex gap-2 hover:border-b w-fit">View on <Image className="pt-1" src='/images/decent.png' height={12} width={85} alt='Decent' /></p>
        </Link>
        <MintButton chainId={chainId} contractAddress={contractAddress} price={tokenPrice} quantity={1} />
      </div>
    </div>
  </>
}

export default NFTCard;