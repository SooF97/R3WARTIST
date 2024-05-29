import Image from "next/image";
import Link from "next/link";
import { mainFont, montserrat } from "../../public/fonts/fonts";
import junk1 from "../../assets/img/1.webp";
import junk2 from "../../assets/img/2.webp";
import junk3 from "../../assets/img/4.webp";
import junk4 from "../../assets/img/5.webp";
import junk5 from "../../assets/img/6.webp";
import junk6 from "../../assets/img/7.webp";

const Hero = () => {
  const items = [
    {
      image: junk1,
      price: "2.5 ETH",
      title: "Bob lane",
      profile: "Sooshio",
      highestbid: "4.5 ETH",
    },
    {
      image: junk2,
      price: "1.25 ETH",
      title: "Bob lane",
      profile: "Sooshio",
      highestbid: "7.2 ETH",
    },
    {
      image: junk3,
      price: "1.25 ETH",
      title: "Bob lane",
      profile: "Sooshio",
      highestbid: "7.2 ETH",
    },
    {
      image: junk4,
      price: "6.8 ETH",
      title: "Bob lane",
      profile: "Sooshio",
      highestbid: "12.0 ETH",
    },
    {
      image: junk5,
      price: "3.0 ETH",
      title: "Bob lane",
      profile: "Sooshio",
      highestbid: "6.5 ETH",
    },
    {
      image: junk6,
      price: "1.25 ETH",
      title: "Bob lane",
      profile: "Sooshio",
      highestbid: "7.2 ETH",
    },
  ];
  return (
    <>
      <section
        style={{
          marginTop: "5%",
        }}
        id="join"
        className="join section-bg"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 style={{ color: "whitesmoke" }}>
                {" "}
                Welcome to <span style={{ color: "lightblue" }}>R3WARTIST</span>
              </h4>
              <p style={{ color: "whitesmoke", fontSize: "large" }}>
                {" "}
                A Blockchain-based Application aiming to fairly reward talented
                ai-gen image Artists
              </p>
            </div>
          </div>
          <br />
          <div className="text-left">
            <div className="flex flex-col md:flex-row items-left gap-2">
              <Link href="/create">
                <button className="button">
                  Get started
                  <span className="button-span"> ─ it's free</span>
                </button>
              </Link>
              <Link href="/explore">
                <button className="explore-button">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span>Explore</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="nftcollections" className="nftcollections">
        <div className="container">
          <div className="mynftsec">
            <div className="row icon-boxes">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 d-flex align-items-stretch"
                >
                  <div className="card">
                    <a href="/explore">
                      <Image
                        style={{ height: "20rem", borderRadius: "10px" }}
                        src={item.image}
                        className="card-img-top"
                        alt="..."
                      />
                    </a>
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

export default Hero;
