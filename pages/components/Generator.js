"use client";
import Link from "next/link";
import { useState } from "react";
import { mainFont, montserrat } from "../../public/fonts/fonts";

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setImageUrl("");
    setLoading(true);

    // post our prompt to our backend
    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      //get the response back from backend, which has the URL which we are looking for
      const result = await response.json();

      //set the image src to the URL which is returned by OpenAI call
      setImageUrl(result.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  return (
    <>
      <>
        <div className="card" style={{ width: "100%" }}>
          <h1
            className={`md:text-6xl text-4xl font-bold ${mainFont.className}`}
          >
            AI Image Generator
          </h1>
          <label>Enter prompt to test it:</label>
          <input
            type="text"
            onChange={handleInput}
            placeholder="Enter a prompt"
          />
          <button className="joinbut full-width-button" onClick={handleSubmit}>
            {loading ? "Generating..." : "Generate Image"}
          </button>
          {imageUrl && (
            <div>
              <h2 className={`md:text-xl text-lg ${montserrat.className}`}>
                Generated Image:
              </h2>
              <Link href={imageUrl} target="_blank">
                <img
                  src={imageUrl}
                  alt="Generated AI"
                  className="card-img-top"
                  style={{
                    height: "500px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />
              </Link>
            </div>
          )}
        </div>
      </>
    </>
  );
}
