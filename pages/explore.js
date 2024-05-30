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
      // const provider = new ethers.providers.JsonRpcProvider(
      //   process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
      // );
      // const provider = new ethers.providers.StaticJsonRpcProvider(
      //   process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
      //   "sepolia"
      // );
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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
      <section
        style={{
          paddingTop: "8%",
        }}
        id="nftcollections"
        className="nftcollections"
      >
        <div className="container">
          <div>
            {fetchingData && (
              <div className="flex justify-center">
                <Loading type="spin" color="black" height={50} width={50} />
              </div>
            )}
          </div>
          <br />

          <div className="mynftsec">
            <div className="row icon-boxes">
              {resultPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 d-flex align-items-stretch"
                >
                  <div className="card">
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

                    <div className="card-body">
                      <h5 className="card-title">
                        <span>Artist id:</span>
                        {""}#{prompt[1].toString()}
                      </h5>
                      <h5 className="card-title">
                        <span className="font-bold">Purchased:</span>
                        {""}
                        {prompt[6].toString()}
                        {""}Times
                      </h5>
                    </div>

                    <div className="price-container">
                      <span className="price left">
                        <span style={{ color: "gray" }}>Artist Address:</span>
                        <br></br>
                        <span style={{ color: "white" }} id="pricetag">
                          {""}
                          {prompt[0].slice(0, 4)}...{prompt[0].slice(-4)}
                        </span>
                      </span>
                      <span className="price right">
                        <span style={{ color: "gray" }}>Price:</span> <br></br>
                        <span style={{ color: "white" }} id="pricetag">
                          {prompt[4].toString()}$
                        </span>
                      </span>
                    </div>
                    <Link href={`/${prompt[1].toString()}`}>
                      <button
                        className="joinbut"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        Buy
                        <svg
                          className="svgIcon"
                          viewBox="0 0 576 512"
                          style={{ marginRight: "8px" }}
                        >
                          <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default explore;
