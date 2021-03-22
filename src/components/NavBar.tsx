import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const NavBar = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      margin="auto"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Tracky
        </Heading>
      </Flex>

      <Flex>
        <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
          <Button bg="transparent" border="1px">
            Categories
          </Button>
        </Box>

        <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
          <Button bg="transparent" border="1px">
            Sign out
          </Button>
        </Box>

        <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
          <Button bg="transparent" border="1px">
            Create account
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
