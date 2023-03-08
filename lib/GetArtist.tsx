import axios from "axios";

export const getArtistETH = async (address: string) => {
  try {
    const url = 'https://hq.decent.xyz/api/1.0/contracts/1?';
    const { data: nfts } = await axios.get(url, {
      params: {
        limit: 100, 
        page: 0, 
        sort: -1,
        creator: address
      },
      headers: {
        accept: 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_DECENT_API_KEY}`
      }
    });
    let projectNFTs = [];
    for (let i = 0; i < nfts.data.length; i++) {
        projectNFTs.push(nfts.data[i]);
        console.log(nfts.data[i])
    }
    
    return projectNFTs;
  } catch (e) {
    console.error(e)
  }
}
