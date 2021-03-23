import { CSSReset, theme } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import { Fonts } from "../util/fonts";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Fonts />
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
