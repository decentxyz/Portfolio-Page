import Image from "next/image";
import Link from "next/link";
import { useNetwork } from "wagmi";
import { useState, useEffect } from "react";

const MarketplaceButtons = (props:any) => {
  const { chain: activeChain } = useNetwork();
  const [chain, setChain] = useState(1);

  useEffect(() => {
    if (activeChain) {
      setChain(activeChain.id);
    }
  }, [activeChain]);

  return <div className="flex gap-4 items-center mt-4 w-full justify-center">
    <p className="font-[500] tracking-widest text-sm">View on:</p>
    {/* <Link href={`https://opensea.io/collection/${props.openseaLink}`} target="_blank" rel="noreferrer">
    <Image src="/images/opensea.png" height={18} width={18} alt="opensea"/></Link> */}
    {/* this repo currently only supports Decent's editions contract */}
    <Link href={`https://hq.decent.xyz/${chain}/Editions/${props.contractAddress}`} target="_blank" rel="noreferrer">
    <Image src="/images/decent-icon.png" height={18} width={22} alt="decent"/></Link>
  </div>
}

export default MarketplaceButtons;
