"use client";
import { ethers } from "ethers";
import Link from "next/link";

import { useEffect, useState } from "react";
import Prompts from "./Prompts.json";

import Loading from "react-loading";

const explore = () => {
  const [resultPrompts, setResultPrompts] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  async function fetchData() {
    setFetchingData(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
      );
      const contract = new ethers.Contract(
        Prompts.address,
        Prompts.abi,
        provider
      );
      const data = await contract.getAllArtists();
      console.log(data);
      setResultPrompts(data);
    } catch (error) {
      console.log(error);
    }
    setFetchingData(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="container mx-auto p-4">
        <div>
          {fetchingData && (
            <div className="flex justify-center">
              <Loading type="spin" color="black" height={50} width={50} />
            </div>
          )}
        </div>
      </section>
      <div className="container mx-auto p-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {resultPrompts.map((prompt, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-100">
              <h4 className="text-md">
                <span className="font-bold">Artist Address:</span>
                {""}
                {prompt[0].slice(0, 4)}...{prompt[0].slice(-4)}
              </h4>
              <h4 className="text-md">
                <span className="font-bold">Artist id:</span>
                {""}#{prompt[1].toString()}
              </h4>
              <h4 className="text-md">
                <span className="font-bold">Price:</span>
                {""}
                {prompt[4].toString()}$
              </h4>
              <h4 className="text-md">
                <span className="font-bold">Purchased:</span>
                {""}
                {prompt[6].toString()}
                {""}Times
              </h4>
              <div className="flex space-x-2 mt-2">
                {prompt[3].map((image, index) => (
                  <Link href={image} target="_blank">
                    <img
                      key={index}
                      src={image}
                      alt="prompt"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                ))}
              </div>
              <div className="flex flex-col justify-center items-center gap-2 mt-2">
                <Link href={`/${prompt[1].toString()}`}>
                  <button className="Btn">
                    Buy
                    <svg className="svgIcon" viewBox="0 0 576 512">
                      <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default explore;
