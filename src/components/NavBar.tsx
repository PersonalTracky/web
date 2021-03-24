import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../util/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  if (data?.me) {
    body = (
      <>
        <Menu>
          <MenuButton mr={10}>
            <Flex alignItems="center">
              <Avatar
                size="sm"
                name={data.me?.username}
                src={data.me?.profilePictureUrl}
              />
              <Icon name="chevron-down" size="24px" />
            </Flex>
          </MenuButton>
          <MenuList
            backgroundColor="#30363d"
            fontSize="medium"
            placement="bottom-end"
          >
            <MenuItem _focus={{ bg: "#1f6feb" }}>
              <Flex alignItems="center" justify="space-between">
                <Icon name="settings" />
                <Text ml={2}>Signed in as {data?.me.username}</Text>
              </Flex>
            </MenuItem>
            <MenuItem _focus={{ bg: "#1f6feb" }}>
              <Flex alignItems="center" justify="space-between">
                <Icon name="view" />
                <Text ml={2}>My categories</Text>
              </Flex>
            </MenuItem>
            <MenuItem _focus={{ bg: "#1f6feb" }}>
              <Flex alignItems="center" justify="space-between">
                <Icon name="view" />
                <Text ml={2}>My notes</Text>
              </Flex>
            </MenuItem>
            <MenuItem _focus={{ bg: "#1f6feb" }}>
              <Flex alignItems="center" justify="space-between">
                <Icon name="small-close" />
                <Text ml={2}>Sign out</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  }

  return (
    <Flex
      as="nav"
      justify="space-between"
      wrap="wrap"
      padding="1.0rem"
      bg="#30363d"
      color="white"
    >
      <Flex alignItems="center" justify="space-evenly">
        <Flex alignItems="center" justify="space-evenly">
          <Image
            size="50px"
            src="https://infrastack-trackybucketb34fbe41-xkf8yusdsf2c.s3-eu-west-1.amazonaws.com/static/logo.png"
            alt="logo"
          />
          <Heading as="h1" size="md" letterSpacing={"-.1rem"} ml={1}>
            <NextLink href="/">
              <Link>Tracky</Link>
            </NextLink>
          </Heading>
        </Flex>
        <Flex
          alignItems="center"
          justify="space-evenly"
          ml={10}
          textAlign="center"
        >
          <Heading as="h1" size="md" letterSpacing={"-.1rem"} ml={3}>
            <NextLink href="/">
              <Link>Categories</Link>
            </NextLink>
          </Heading>
          <Heading as="h1" size="md" letterSpacing={"-.1rem"} ml={3}>
            <NextLink href="/">
              <Link>Notes</Link>
            </NextLink>
          </Heading>
        </Flex>
      </Flex>
      {body}
    </Flex>
  );
};

export default NavBar;
