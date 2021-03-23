import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import Footer from "../components/Footer";
import { Layout } from "../components/Layout";
import { useMeQuery } from "../generated/graphql";
import Workspace from "../public/workspace.svg";
import { createUrqlClient } from "../urql/createUrqlClient";

const Index = () => {
  const [{ data }] = useMeQuery();
  let body = null;
  if (!data?.me) {
    body = (
      <Flex alignItems="flex-end" justify="space-evenly" ml={10} mt={10}>
        <Heading as="h1" size="2xl" letterSpacing={"-.1rem"} ml={1}>
          Keep track of anything
        </Heading>
        <Box size="2xl">
          <Workspace />
        </Box>
      </Flex>
    );
  } else {
    body = <Text>Under development</Text>;
  }
  return (
    <>
      <Layout />
      {body}
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
