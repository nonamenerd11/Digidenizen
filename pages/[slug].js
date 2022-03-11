import React from "react";
import NFT from "../components/NFT";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const router = useRouter();
  const [genAcc, setGenAcc] = useState("");
  const [nft, setNft] = useState([]);
  const { account, Moralis } = useMoralis();

  const [id, setId] = useState(null);

  const performRedirect = () => {
    if (id.includes(router.asPath.replace("/", ""))) {
      return;
    } else router.push("/");
  };

  const getDocs = async () => {
    const results = await Moralis.Cloud.run("getUsers");
    let array = results.map((item) => {
      const attr = item?.attributes?.discordId;
      if (attr) {
        const res = attr;
        return res;
      }
    });

    array = array.filter(function (element) {
      return element !== undefined;
    });

    setId(array);
    return array;
  };

  const getAccount = async () => {
    const results = await Moralis.Cloud.run("getId", {
      discordId: router.asPath.replace("/", ""),
    });

    setGenAcc(results[0].attributes.accounts[0]);
  };

  async function getNFTs() {
    try {
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
      const url = `${process.env.NEXT_PUBLIC_API_URI}/${genAcc}/nft`;

      const data = await axios({
        method: "GET",
        url: url,
        params: options.params,
        headers: options.headers,
      });
      // console.log(data.data);
      setNft(data.data.result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function perform() {
      // console.log(account, id);
      if (account) {
        await getDocs();
        if (id) {
          await performRedirect();
          await getAccount();
          await getNFTs();
        }
      }
    }

    perform();
  }, [account, router, id]);

  return (
    <div className="w-full">
      <NFT nft={nft} />
    </div>
  );
};

export default App;
