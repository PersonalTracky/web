import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import { GridItem } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useMeQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../urql/createUrqlClient";
import { toErrorsMap } from "../util/toErrorsMap";

const Image = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
`;

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data }] = useMeQuery();
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [, forgotPassword] = useForgotPasswordMutation();
  let body = null;
  if (!data?.me) {
    body = (
      <Flex alignItems="center" justify="center" ml={6} mt="5%">
        <Grid templateRows="repeat(2, 1fr)">
          <GridItem rowSpan={1} mb={15}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Heading as="h1" size="xl" letterSpacing={"-.1rem"} mr={20}>
                Keep track of anything
              </Heading>
            </motion.h1>
          </GridItem>
          <GridItem rowSpan={2}>
            <Flex alignItems="center">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1.5 } }}
              >
                <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }} mr={6}>
                  <NextLink href="/register">
                    <Button
                      as={Link}
                      bg="gray.800"
                      border="1px"
                      _hover={{ bg: "gray.500" }}
                      color="white"
                    >
                      Create account
                    </Button>
                  </NextLink>
                </Box>
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1.5 } }}
              >
                <Box display={{ md: "block" }} mt={{ base: 4, md: 0 }}>
                  <Button
                    as={Link}
                    bg="gray.800"
                    border="1px"
                    _hover={{ bg: "gray.500" }}
                    color="white"
                    onClick={onOpen}
                  >
                    Login
                  </Button>
                </Box>
              </motion.button>
            </Flex>
          </GridItem>
        </Grid>
        <Box size="2xs">
          <Image
            src="/notebook.svg"
            alt="notebook"
            drag={true}
            dragConstraints={{ left: 0, right: 100, top: 0, bottom: 50 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          />
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Tabs isFitted variant="enclosed">
                  <TabList mb="1em">
                    <Tab>Login</Tab>
                    <Tab>Forgot password?</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Wrapper variant="small">
                        <Formik
                          initialValues={{ usernameOrEmail: "", password: "" }}
                          onSubmit={async (values, { setErrors }) => {
                            const response = await login(values);
                            if (response.data?.login.errors) {
                              setErrors(
                                toErrorsMap(response.data.login.errors)
                              );
                            } else if (response.data?.login.user) {
                              if (typeof router.query.next === "string") {
                                router.push(router.query.next);
                              } else {
                                router.push("/");
                              }
                            }
                          }}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <InputField
                                name="usernameOrEmail"
                                placeholder="Username or email"
                                label="Username or Email"
                              />
                              <Box mt={4}>
                                <InputField
                                  name="password"
                                  placeholder="Password"
                                  label="Password"
                                  type="password"
                                />
                              </Box>
                              <Button
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                                bg="gray.800"
                                border="1px"
                                _hover={{ bg: "gray.500" }}
                                color="white"
                              >
                                Login
                              </Button>
                            </Form>
                          )}
                        </Formik>
                      </Wrapper>
                    </TabPanel>
                    <TabPanel>
                      <Formik
                        initialValues={{ email: "" }}
                        onSubmit={async (values, {}) => {
                          await forgotPassword(values);
                          onClose();
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <InputField
                              name="email"
                              placeholder="email"
                              label="Email"
                            />
                            <Button
                              mt={4}
                              type="submit"
                              isLoading={isSubmitting}
                              bg="gray.800"
                              border="1px"
                              _hover={{ bg: "gray.500" }}
                              color="white"
                            >
                              Reset
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Flex>
    );
  } else {
    body = <Text>Under development</Text>;
  }
  return (
    <>
      <Head>
        <title>Tracky</title>
        <link rel="shortcut icon" href="/Logo.svg" />
      </Head>
      <Layout />
      {body}
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
