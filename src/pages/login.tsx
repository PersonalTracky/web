import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { toErrorsMap } from "../util/toErrorsMap";
import { createUrqlClient } from "../urql/createUrqlClient";
import { Layout } from "../components/Layout";
import Footer from "../components/Footer";
import { Box, Button } from "@chakra-ui/core";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <>
      <Layout />
      <Wrapper variant="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login.errors) {
              setErrors(toErrorsMap(response.data.login.errors));
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
                placeholder="username or email"
                label="Username or Email"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
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
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
