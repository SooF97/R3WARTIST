"use client";
import { useState } from "react";
import { mainFont, montserrat } from "../public/fonts/fonts";

import { ethers } from "ethers";

import Prompts from "./Prompts.json";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import FormData from "form-data";

import { useAddress, useSigner } from "@thirdweb-dev/react";

const create = () => {
  const API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

  // the endpoint needed to upload the file
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const userAddress = useAddress();
  const signer = useSigner();

  const [input1, setInput1] = useState([""]);
  const [input2, setInput2] = useState([""]);
  const [input3, setInput3] = useState([""]);
  const [prompts, setPrompts] = useState([""]);
  const [images, setImages] = useState([""]);
  const [uris, setUris] = useState([""]);
  const [price, setPrice] = useState();
  const [imagesAreUploading, setImagesAreUploading] = useState(false);
  const [promptIsRegistring, setPromptIsRegistring] = useState(false);

  const handleAddInput = () => {
    setPrompts([input1, input2, input3]);
    console.log(prompts);
  };

  const handleInput1 = (e) => {
    setInput1(e.target.value);
  };
  const handleInput2 = (e) => {
    setInput2(e.target.value);
  };
  const handleInput3 = (e) => {
    setInput3(e.target.value);
  };

  const handleImageChange = async (event) => {
    setImagesAreUploading(true);
    const files = event.target.files;
    const finalUris = [];
    let i = 0;
    for (i; i < files.length; i++) {
      try {
        console.log("filename:", files[i].name);
        // initialize the form data
        const formData = new FormData();

        // append the file form data to
        formData.append("file", files[i]);

        const response = await axios.post(url, formData, {
          maxContentLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_SECRET,
          },
        });

        console.log(`https://ipfs.io/ipfs/${response.data.IpfsHash}`);
        // finalUris.push(`https://ipfs.io/ipfs/${response.data.IpfsHash}`);
        finalUris[i] = `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
      setUris(finalUris);
      console.log(finalUris);
      setImagesAreUploading(false);
    }
  };

  function handlePrice(e) {
    console.log(e.target.value);
    setPrice(e.target.value);
  }

  async function registerArtistPrompt() {
    setPromptIsRegistring(true);
    console.log(prompts);
    console.log(uris);
    console.log(price);
    try {
      const contract = new ethers.Contract(
        Prompts.address,
        Prompts.abi,
        signer
      );
      const transaction = await contract.registerPrompts(prompts, uris, price);
      await transaction.wait();
      console.log(transaction);

      toast("Prompt successfully registred and listed!", {
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
    setPromptIsRegistring(false);
  }

  return (
    <>
      <ToastContainer />
      <div className="md:py-16 py-12 flex flex-col gap-10">
        <div className="flex flex-col md:flex-col md:items-center md:justify-center items-center justify-center text-center gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <h1
              className={`md:text-4xl text-3xl font-bold ${mainFont.className}`}
            >
              How it works ?{" "}
            </h1>
          </div>
          <p className={`md:text-xl text-md ${montserrat.className}`}>
            Generate new revenue streams through your tested ai-gen prompts
          </p>
        </div>
      </div>
      <section className="flex flex-col text-center justify-center items-center py-2">
        <div className="flex flex-col justify-start items-start space-y-4 p-6 rounded-2xl bg-white w-96 ">
          <label htmlFor="prompts">Enter your proved ai-gen prompts:</label>
          <div className="flex flex-col gap-1">
            <input
              id="prompt"
              name="prompt"
              type="text"
              onChange={handleInput1}
              className="border rounded p-2 w-full"
              placeholder="Prompt 1"
            />
            <input
              id="prompt"
              name="prompt"
              type="text"
              onChange={handleInput2}
              className="border rounded p-2 w-full"
              placeholder="Prompt 2"
            />
            <input
              id="prompt"
              name="prompt"
              type="text"
              onChange={handleInput3}
              className="border rounded p-2 w-full"
              placeholder="Prompt 3"
            />
          </div>
          <button
            onClick={handleAddInput}
            className={` text-gray-950 p-2 rounded ${
              prompts[0] == "" ? `bg-gray-300` : `bg-green-500`
            } `}
          >
            Submit Prompts
          </button>
        </div>
      </section>
      <section className="flex flex-col text-center justify-center items-center py-2">
        <div className="flex flex-col justify-start items-start space-y-4 p-6 rounded-2xl bg-white w-96 ">
          <label htmlFor="images">Upload your previous ai-gen images:</label>
          {images.map((image, index) => (
            <input
              key={index}
              type="file"
              id="images"
              name="images"
              multiple
              value={image}
              onChange={(event) => handleImageChange(event)}
              className="border rounded p-2 w-full "
            />
          ))}
        </div>
        {imagesAreUploading && (
          <div className="mt-2 flex justify-center">
            <Loading type="spin" color="black" height={25} width={25} />
          </div>
        )}
      </section>
      <section className="flex flex-col text-center justify-center items-center py-2">
        <div className="flex flex-col justify-start items-start space-y-4 p-6 rounded-2xl bg-white w-96 ">
          <label htmlFor="price">Selling price:</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price in Dollars $"
            onChange={handlePrice}
            className="border rounded p-2 w-full "
          />
        </div>
      </section>
      <section
        className={`flex flex-col text-center justify-center items-center font-bold ${montserrat.className}`}
      >
        <button className="button-register" onClick={registerArtistPrompt}>
          <svg
            className="svgIcon"
            viewBox="0 0 512 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
          </svg>
          Register
        </button>
        {promptIsRegistring && (
          <div className="mt-2 flex justify-center">
            <Loading type="spin" color="black" height={25} width={25} />
          </div>
        )}
      </section>
    </>
  );
};

export default create;
