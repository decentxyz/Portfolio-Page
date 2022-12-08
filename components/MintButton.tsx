import { DecentSDK, edition } from "@decent.xyz/sdk";
import { useSigner } from "wagmi";
import { ethers } from "ethers";

const MintButton = (props:any) => {
  const { data:signer } = useSigner();

  const mint = async () => {
    if (signer) {
      //chainId for testing on Goerli
      const sdk = new DecentSDK(props.chainId, signer);
      const nftOne = await edition.getContract(sdk, props.contractAddress)
      await nftOne.mint(1, { value: ethers.utils.parseEther(props.price) })
    } else {
      console.log("No signer");
    }
  }

  return (
    <button onClick={mint}>Mint</button>
  );
};

export default MintButton;