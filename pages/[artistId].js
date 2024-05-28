"use client";
import { ethers } from "ethers";

import Link from "next/link";

import { useEffect, useState } from "react";
import Prompts from "./Prompts.json";

import { useRouter } from "next/router";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSigner } from "@thirdweb-dev/react";

const artistPage = () => {
  const signer = useSigner();
  const router = useRouter();
  const [fetchingArtist, setFetchingArtist] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [bought, setBought] = useState(false);

  const [address, setAddress] = useState("");
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfPurchase, setNumberOfPurchase] = useState("");
  const [images, setImages] = useState([]);

  async function fetchArtistData() {
    setFetchingArtist(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        Prompts.address,
        Prompts.abi,
        provider
      );

      const artist_id = router.query.artistId;
      console.log(typeof artist_id);

      const data = await contract.getArtist(artist_id);
      console.log(data);
      setAddress(data[0]);
      setArtist(data[1].toString());
      setPrice(data[4].toString());
      setNumberOfPurchase(data[6].toString());
      setImages(data[3]);
      setIsDataFetched(true);
    } catch (error) {
      console.log(error);
    }
    setFetchingArtist(false);
  }

  async function purchasePrompt() {
    setIsBuying(true);
    try {
      const contract = new ethers.Contract(
        Prompts.address,
        Prompts.abi,
        signer
      );
      const ethInUsd = await contract.getChainlinkDataFeedLatestAnswer();
      const finalEthInUsd = ethInUsd / 100000000;
      const priceInEth = price / finalEthInUsd;
      const priceInWei = priceInEth * (1 * 10 ** 18);
      console.log(priceInWei);
      const transaction = await contract.buyPrompt(artist, {
        value: parseInt(priceInWei),
      });
      await transaction.wait();
      console.log(transaction);

      toast("Prompt purchased successfully!", {
        type: "success",
      });
      setBought(true);
    } catch (error) {
      console.log(error);
    }
    setIsBuying(false);
  }

  useEffect(() => {
    if (!router.isReady) return;
    fetchArtistData();
  }, [router.isReady]);

  return (
    <>
      <ToastContainer />
      <section className="container mx-auto p-4">
        <div>
          {fetchingArtist && (
            <div className="flex justify-center">
              <Loading type="spin" color="black" height={50} width={50} />
            </div>
          )}
        </div>
      </section>
      <div className={`flex flex-col justify-center items-center  `}>
        {isDataFetched && (
          <div className="border rounded-lg p-4 bg-gray-100">
            <h4 className="text-md">
              <span className="font-bold">Artist Address:</span> {address}
            </h4>
            <h4 className="text-md">
              <span className="font-bold">Artist id:</span> #{artist}
            </h4>
            <h4 className="text-md">
              <span className="font-bold">Price:</span> {price}$
            </h4>
            <h4 className="text-md">
              <span className="font-bold">Purchased:</span> {numberOfPurchase}{" "}
              Times
            </h4>
            <h2 className="font-bold">Previous ai-generative images:</h2>
            <div className="flex flex-row items-center justify-center space-x-2 mt-2">
              {images.map((image, index) => (
                <Link href={image} target="_blank">
                  <img
                    key={index}
                    src={image}
                    alt="prompt"
                    className="object-cover rounded"
                    width={200}
                    height={200}
                  />
                </Link>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mt-2">
              <button className="Btn" onClick={purchasePrompt}>
                Pay {price}$
                <svg className="svgIcon" viewBox="0 0 576 512">
                  <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                </svg>
              </button>
              {isBuying && (
                <div className="flex justify-center">
                  <Loading type="spin" color="black" height={25} width={25} />
                </div>
              )}
            </div>
            {bought && (
              <div>
                <Link href="/dashboard">Check your purchased prompts</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default artistPage;
