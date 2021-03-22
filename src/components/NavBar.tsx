import React from "react";
import { Box, Heading, Flex, Text, Button, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";
import NextLink from "next/link";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  if (!data?.me) {
    body = (
      <>
        <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
          {/* TODO: route to register when implemented register page*/}
          <NextLink href="/">
            <Button
              as={Link}
              bg="gray.800"
              border="1px"
              _hover={{ bg: "gray.500" }}
            >
              Create account
            </Button>
          </NextLink>
        </Box>
        <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
          <NextLink href="/login">
            <Button
              as={Link}
              bg="gray.800"
              border="1px"
              _hover={{ bg: "gray.500" }}
            >
              Sign in
            </Button>
          </NextLink>
        </Box>
      </>
    );
  } else {
    body = (
      <>
        {/* TODO: route to register when implemented categories page*/}
        <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
          <NextLink href="/">
            <Button
              as={Link}
              bg="gray.800"
              border="1px"
              _hover={{ bg: "gray.500" }}
            >
              Categories
            </Button>
          </NextLink>
        </Box>

        {/* TODO: handle signout logic*/}
        <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
          <NextLink href="/">
            <Button
              as={Link}
              bg="gray.800"
              border="1px"
              _hover={{ bg: "gray.500" }}
            >
              Sign out
            </Button>
          </NextLink>
        </Box>

        {/* TODO: route to register when implemented account page*/}
        <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
          <NextLink href="/">
            <Button
              as={Link}
              bg="gray.800"
              border="1px"
              _hover={{ bg: "gray.500" }}
            >
              Account
            </Button>
          </NextLink>
        </Box>
      </>
    );
  }

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
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <NextLink href="/">
            <Link>Tracky</Link>
          </NextLink>
        </Heading>
      </Flex>
      <Flex>{body}</Flex>
    </Flex>
  );
};

export default NavBar;
