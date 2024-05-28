"use client";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import Generator from "./components/Generator";

import { ethers } from "ethers";

import { useState } from "react";
import Prompts from "./Prompts.json";

const dashboard = () => {
  const userAddress = useAddress();
  const signer = useSigner();

  const [result, setResult] = useState([]);
  const [isFetching, setIsFetching] = useState();

  async function fetchMyData() {
    let finalResult = [];
    setIsFetching(true);
    try {
      const contract = new ethers.Contract(
        Prompts.address,
        Prompts.abi,
        signer
      );
      const data = await contract.fetchUserPrompts();
      setResult(data);
      console.log("result", result);
      finalResult[0] = data[0];
      finalResult[1] = data[1];
      finalResult[2] = data[2];
      console.log("final resul", finalResult);
      setIsFetching(false);
      return finalResult;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div
        className="flex flex-col justify-center items-center py-6"
        onClick={fetchMyData}
      >
        <button className="fancy">
          <span className="top-key"></span>
          <span className="text">Fetch my purchased prompts</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>
      </div>
      {result.length > 0 && (
        <div className="flex flex-col justify-center items-center gap-2 text-lg ">
          <p className="border-current text-gray-950 p-2 ">
            <span className="font-bold underline">PROMPT N°1: </span>
            {result[0]}
          </p>
          <p className="border-current text-gray-950 p-2 ">
            <span className="font-bold underline">PROMPT N°2: </span>
            {result[1]}
          </p>
          <p className="border-current text-gray-950 p-2 ">
            <span className="font-bold underline">PROMPT N°3: </span>
            {result[2]}
          </p>
          <hr className="font-bold"></hr>
          <section className="mt-4">
            <Generator />
          </section>
        </div>
      )}
    </div>
  );
};

export default dashboard;
