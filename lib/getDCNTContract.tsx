import {
  crescendo,
  edition,
  rentable,
  staking,
  vault,
  vaultBackedNFT,
} from "@decent.xyz/sdk";

const getDCNTContract = async (address:any, DCNTContractType:any, sdk:any) => {
  const dcntContractTypes:any = {
    treasury: vault,
    staking: staking,
    editions: edition,
    rentable: rentable,
    crescendo: crescendo,
    "treasury-backed": vault,
  };
  const contractSdk = dcntContractTypes[DCNTContractType.toLowerCase()];
  const contract = await contractSdk.getContract(sdk, address);
  return contract;
};

export default getDCNTContract;