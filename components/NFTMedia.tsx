import Image from "next/image";
import getIpfsLink from "../lib/getIpfsLink";
import { useState, useEffect } from "react";

interface NFTMedia {
  ipfsImage: string;
  ipfsVideo: string;
  mimeType: string;
}

const NFTMedia = ({ipfsImage, ipfsVideo, mimeType}: NFTMedia) => {
  const [mediaType, setMediaType] = useState<string>('image');
  const [src, setSrc] = useState<string>(ipfsImage)

  useEffect(() => {
    if (mimeType.includes('video')) {
      setMediaType('video');
    } else {
      setMediaType('image');
    }
  }, [mediaType, mimeType]);

  return (
    <div className="relative">
      {mediaType === 'image' ? 
        <Image 
          className="rounded-md" 
          src={getIpfsLink(src)}
          placeholder="blur"
          blurDataURL={"/images/placeholder.png"}
          alt="" width={360} 
          height={360}
          onError={() => setSrc('/images/errorImage.png')}
        /> :   
      mediaType === 'video' ? 
        <video className="max-h-[360px]" height={360} width={360} controls src={getIpfsLink(ipfsVideo)}></video> : 
        <div className="relative">
        <Image className="rounded-md" src="/images/card1.png" alt="" width={360} height={360} />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-[500] text-sm tracking-widest">Unsupported File Type</p>
      </div> 
      }
    </div>
  )
}

export default NFTMedia