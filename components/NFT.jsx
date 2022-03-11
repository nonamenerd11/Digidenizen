import React from "react";
import { useMoralis } from "react-moralis";
import SingleNFT from "./SingleNFT";

const NFT = ({ nft }) => {
  const { isAuthenticated } = useMoralis();

  // console.log(nft);

  return (
    <div className="w-full mt-5 flex flex-col items-center">
      <p
        className={`text-xl font-bold ${isAuthenticated ? "show" : "hidden"} `}
      >
        Your NFTs
      </p>
      <div
        className={`w-full flex flex-wrap ${
          isAuthenticated ? "show" : "hidden"
        } justify-center p-3 mb-3`}
      >
        {nft.length === 0 ? (
          <p className="text-xl font-bold">There are no NFT's</p>
        ) : (
          nft.map((item, index) => {
            return <SingleNFT data={item} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default NFT;
