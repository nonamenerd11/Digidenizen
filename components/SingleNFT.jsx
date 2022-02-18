import React, { useEffect, useState } from "react";

const SingleNFT = ({ data }) => {
  const [parsedImage, setParsedImage] = useState("");
  const [checked, isChecked] = useState(true);
  const { metadata } = data;
  const parsedData = JSON.parse(metadata);

  function imageProcessor() {
    if (metadata) {
      const baseStr = "https://ipfs.io/ipfs/";
      const nativeImage = parsedData.image;
      let finalUrl = "";
      if (nativeImage.startsWith("ipfs://ipfs")) {
        finalUrl = baseStr + nativeImage.split("ipfs://ipfs").slice(-1);
      } else if (nativeImage.startsWith("ipfs://")) {
        finalUrl = baseStr + nativeImage.split("ipfs://").slice(-1);
      } else {
        finalUrl = nativeImage + "?format=json";
      }
      setParsedImage(finalUrl);
    }
  }

  useEffect(() => {
    imageProcessor();
    if (!metadata) {
      isChecked(false);
    }
    // console.log(parsedData);
  }, [data, isChecked, metadata]);

  return (
    <>
      {checked ? (
        <div className="md:w-[30%] flex flex-col items-center rounded-md justify-center bg-discord-dark p-5 mx-2 my-2">
          <>
            <img src={parsedImage} alt="NFT" className="w-[90%] rounded" />
            <p className="text-white font-bold mt-3">{parsedData?.name}</p>
            <p className="text-white font-bold mt-3">
              {parsedData?.token_number}
            </p>
          </>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SingleNFT;
