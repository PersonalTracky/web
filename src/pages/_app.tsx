import { CSSReset, theme } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import { Fonts } from "../util/fonts";
import "../../public/app.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Fonts />
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
