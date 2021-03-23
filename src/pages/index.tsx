import { Box, Flex, Heading } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import Footer from "../components/Footer";
import { Layout } from "../components/Layout";
import Workspace from "../public/workspace.svg";
import { createUrqlClient } from "../urql/createUrqlClient";

const Index = () => {
  return (
    <>
      <Layout />
      <Flex alignItems="flex-end" justify="space-evenly" ml={10} mt={10}>
          <Heading as="h1" size="2xl" letterSpacing={"-.1rem"} ml={1}>
            Keep track of anything
          </Heading>
          <Box size="2xl">
            <Workspace/>
          </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
