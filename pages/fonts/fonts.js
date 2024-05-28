import { Inter, Montserrat } from "next/font/google";

import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });
export const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export const heroFontBold = localFont({
  src: "./TT_Bold.ttf",
  weight: "400",
  preload: true,
});

export const heroFontExtraBold = localFont({
  src: "./TT_ExtraBold.ttf",
  weight: "400",
  preload: true,
});

export const mainFont = localFont({
  src: "./Obviously-Bold.otf",
  weight: "400",
  preload: true,
});
