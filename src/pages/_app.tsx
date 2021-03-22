import { theme, ThemeProvider } from "@chakra-ui/core";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
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
