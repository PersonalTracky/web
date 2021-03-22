import { theme, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import { Fonts } from "../util/fonts";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
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
