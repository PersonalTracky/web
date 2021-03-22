import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import Footer from "../components/Footer";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../urql/createUrqlClient";
import theme from "../util/theme";

const Index = () => {
  return (
    <>
      <Layout />
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
