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
    <>
      <section
        style={{
          paddingTop: "8%",
        }}
        id="nftdetails"
        className="nftdetails"
      >
        <div className="container">
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
          <div id="aboutmore" className="row">
            <div className="col-lg-6 col-md-6 order-1 order-lg-1 content">
              {result.length > 0 && (
                <div>
                  <div className="headpare">
                    <h5>PROMPT N°1:</h5>

                    <p>{result[0]}</p>
                  </div>
                  <br />
                  <div className="headpare">
                    <h5>PROMPT N°2:</h5>

                    <p>{result[1]}</p>
                  </div>
                  <br />
                  <div className="headpare">
                    <h5>PROMPT N°3:</h5>

                    <p>{result[2]}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 pt-4 pt-lg-0 order-2 order-lg-2 content">
              <Generator />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default dashboard;
