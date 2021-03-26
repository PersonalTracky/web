import { Box, Button, Flex, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import { InputField } from "../../components/InputField";
import NavBar from "../../components/NavBar/NavBar";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../urql/createUrqlClient";
import { toErrorsMap } from "../../util/toErrorsMap";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <>
      <NavBar />
      <Wrapper variant="small">
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            });
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorsMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="newPassword"
                placeholder="new password"
                label="New Password"
                type="password"
              />
              {tokenError ? (
                <Flex>
                  <Box mr={2} style={{ color: "red" }}>
                    {tokenError}
                  </Box>
                  <NextLink href="/forgot-password">
                    <Link>Generate new reset token</Link>
                  </NextLink>
                </Flex>
              ) : null}
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                bg="gray.800"
                border="1px"
                _hover={{ bg: "gray.500" }}
                color="white"
              >
                Change password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
