import { Inter, Montserrat } from "next/font/google";

import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

const heroFontBold = localFont({
  src: "./TT_Bold.ttf",
  weight: "400",
  preload: true,
});

const heroFontExtraBold = localFont({
  src: "./TT_ExtraBold.ttf",
  weight: "400",
  preload: true,
});

const mainFont = localFont({
  src: "./Obviously-Bold.otf",
  weight: "400",
  preload: true,
});

export { heroFontBold, heroFontExtraBold, inter, mainFont, montserrat };
