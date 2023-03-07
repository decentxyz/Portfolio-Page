import axios from "axios";

export const getReleases = async (symbol1: string, symbol2: string) => {
  try {
    const url = 'https://hq.decent.xyz/api/1.0/contracts/1'
    const { data: nfts } = await axios.get(url, {
      params: {
        limit: 100, 
        page: 0, 
        sort: -1
      },
      headers: {
        accept: 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_DECENT_API_KEY}`
      }
    });
    let projectNFTs = [];
    for (let i = 0; i < nfts.data.length; i++) {
      if (nfts.data[i].data.symbol === symbol1 || nfts.data[i].data.symbol === symbol2) {
        projectNFTs.push(nfts.data[i]);
      }
    }
    return projectNFTs;
  } catch (e) {
    console.error(e)
  }
}