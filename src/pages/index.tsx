import { withUrqlClient } from "next-urql";
import React from "react";
import Footer from "../components/Footer";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../urql/createUrqlClient";

const Index = () => {
  return (
    <>
      <Layout />
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
