import { DecentSDK, edition } from "@decent.xyz/sdk";
import { useSigner, useAccount } from "wagmi";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState } from "react";
import handleTxError from "../lib/handleTxError";

const MintButton = (props:any) => {
  const { data:signer } = useSigner();
  const { address:account } = useAccount();
  const [isMinting, setIsMinting] = useState(false);

  const onSigning = (isMinting:boolean) => {
    setIsMinting(isMinting || false);
  };

  const onSuccess = (receipt:any) => {
    if (receipt) setIsMinting(false);
  };

  const onSuccessfulMint = async (receipt:any) => {
    onSuccess?.(receipt);
    toast.success("Minted successfully.");
  }

  console.log(signer)

  const mint = async () => {
    if (signer && account) {
      try {
        onSigning?.(true);
        const sdk = new DecentSDK(props.chainId, signer);
        const to = account;
        const price:number = props.price * props.quantity;
        const nft = await edition.getContract(sdk, props.contractAddress);
        console.log(nft)
        const tx = await nft.mint(to, props.quantity, { value: ethers.utils.parseEther(price.toString()) });
        const receipt = await tx.wait();
        await onSuccessfulMint(receipt);
      } catch (error) {
        handleTxError(error);
        onSigning?.(false);
      }
    } else {
      toast.error("Please connect wallet to continue.");
    }
  }

  return <div className="flex gap-4 py-2 items-center px-4 sm:px-0">
      <button className="bg-black hover:bg-opacity-80 text-white px-5 py-1 rounded-full font-[600] w-full text-lg uppercase" onClick={mint}>{isMinting ? "..." : "Mint"}</button>
    </div>;
};

export default MintButton;