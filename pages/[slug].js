import React from "react";
import NFT from "../components/NFT";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

const App = () => {
  const { account } = useMoralis();
  const router = useRouter();

  async function pusher() {
    if (router.asPath !== `/${account}`) {
      await router.push(`/${account}`);
    }
  }

  useEffect(() => {
    if (account) {
      pusher();
    } else router.push("/");
  }, [router]);

  return (
    <div className="w-full">
      <NFT />{" "}
    </div>
  );
};

export default App;
