import {
  Avatar,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../util/isServer";
import { Image } from "./Image";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [, logout] = useLogoutMutation();
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
                size="md"
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
                <NextLink href="/profile">
                  <Link ml={2}>Logged in as {data?.me.username}</Link>
                </NextLink>
              </Flex>
            </MenuItem>
            <MenuItem _focus={{ bg: "#1f6feb" }}>
              <Flex alignItems="center" justify="space-between">
                <Icon name="view" />
                <Text ml={2}>My categories</Text>
              </Flex>
            </MenuItem>
            <MenuItem
              _focus={{ bg: "#1f6feb" }}
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <Flex alignItems="center" justify="space-between">
                <Icon name="small-close" />
                <Text ml={2}>Log out</Text>
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
          <div>
            <Image
              whileTap={{ scale: 0.9 }}
              src="/logo.svg"
              alt="logo"
              height={65}
              width={72}
              onClick={() => {
                router.push("/");
              }}
            />
          </div>
        </Flex>
        <Flex
          alignItems="center"
          justify="space-evenly"
          ml={4}
          textAlign="center"
        >
          <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
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
