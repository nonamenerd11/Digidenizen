import Link from "next/link";
import Router from "next/router";
import React, { useEffect } from "react";
import { useChain, useMoralis } from "react-moralis";

const Header = () => {
  const {
    authenticate,
    logout,
    isAuthenticated,
    Moralis,
    initialize,
    isWeb3Enabled,
  } = useMoralis();
  const { switchNetwork } = useChain();

  const handleAuth = async () => {
    if (!isAuthenticated) {
      await authenticate();
      if (!isAuthenticated) {
        Router.reload();
        web3enable();
      }
    } else {
      await logout();
    }
  };

  async function web3enable() {
    await Moralis.enableWeb3();
    await switchNetwork("0x89");
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (!isWeb3Enabled) {
        web3enable();
      }
      initialize();
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[94%] p-3 flex justify-between items-center">
        <p className="text-2xl font-bold text-white cursor-pointer">
          <Link href={"/"}>Discord Add</Link>
        </p>
        <div className="flex flex-row-reverse items-center">
          <p
            className="font-bold bg-discord hover:bg-discord-dark cursor-pointer hover:text-slate-400 transition duration-500 p-3 rounded-lg"
            onClick={handleAuth}
          >
            {!isAuthenticated ? "Authenticate" : "Log Out"}
          </p>
        </div>
      </div>
      <div className="h-1 bg-discord rounded-full w-[95%]"></div>
    </div>
  );
};

export default Header;
