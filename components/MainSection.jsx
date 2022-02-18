import React, { useEffect, useState } from "react";
import { SiDiscord } from "react-icons/si";
import { useMoralis, useNFTBalances } from "react-moralis";

const Authenticated = (props) => {
  return (
    <div className="w-[75vw] md:w-[50vw] lg:w-[35vw] p-3 flex flex-col border-slate-600 border-2 bg-slate-600 items-center rounded-lg mt-[10vh]">
      <p className="text-xl">Enter Discord Username</p>
      <div className="mt-2 text-discord">
        <SiDiscord fontSize={30} />
      </div>
      <input
        type="text"
        className="mt-3 bg-slate-700 w-[95%] p-3 text-center"
        placeholder="Enter your Username"
        value={props.userName}
        onChange={(e) => props.setUserName(e.target.value)}
      />
      <input
        type="submit"
        value="Submit Username"
        className="p-2 mt-3 bg-discord rounded-lg cursor-pointer"
        onClick={props.handleSubmit}
      />
    </div>
  );
};

const NonAuth = () => {
  return (
    <div className="mt-[10vh] text-3xl w-[90%] text-center">
      Authenticate to enter your discord username
    </div>
  );
};

const MainSection = () => {
  const [userName, setUserName] = useState("");
  const { isAuthenticated, setUserData } = useMoralis();

  const handleSubmit = async () => {
    try {
      await setUserData({
        discordId: userName,
      });
      alert("Your username has been saved");
      // console.log(userName);
      setUserName("");
    } catch (e) {
      console.log(e);
    }
  };

  if (isAuthenticated) {
    return (
      <Authenticated
        userName={userName}
        setUserName={setUserName}
        handleSubmit={handleSubmit}
      />
    );
  } else return <NonAuth />;
};

export default MainSection;
