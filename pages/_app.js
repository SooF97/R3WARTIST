"use client";
import "@/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import Navbar from "./components/Navbar";

import "../assets/vendor/aos/aos.css";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/glightbox/css/glightbox.min.css";
import "../assets/vendor/swiper/swiper-bundle.min.css";
import "../assets/css/style.css";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="03ed6dc80620c178a1786170c8d5db39"
    >
      <div className="bg-gradient-to-r from-[#FFFFFF] to-[#c9c6f0] min-h-screen">
        <Head>
          <title>REWARTIST | Rewarding the New generation of Artists</title>
          <meta
            name="description"
            content="This is a decentralized application built to reward ai-gen artists for their proved prompts."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="keywords"
            content="DApp, Decentralized Application, Blockchain, Ethereum, Thirdweb, Next.js"
          />
          <meta name="author" content="Soufiane MASAD" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}
