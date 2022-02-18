import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import SingleNFT from "./SingleNFT";
import axios from "axios";

const NFT = () => {
  const [nft, setNft] = useState([]);

  const { isAuthenticated, account } = useMoralis();

  async function getNFTs() {
    axios.defaults.headers.common = {
      "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
    };
    const options = {
      params: {
        chain: "0x89",
        token_addresses: "0xb3a6e5f8982ed3b02a04159d1bde864ebed23c82",
      },
      headers: {
        "content-type": "application/json",
        charset: "utf-8 ",
      },
    };
    const url = `${process.env.NEXT_PUBLIC_API_URI}/${account}/nft`;

    const data = await axios({
      method: "GET",
      url: url,
      params: options.params,
      headers: options.headers,
    });
    console.log(data.data);
    setNft(data.data.result);
    try {
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (isAuthenticated && account) {
      getNFTs();
      console.log(account);
    } else setNft([]);
  }, [isAuthenticated, account]);

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
        {nft.length < 0 ? (
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
