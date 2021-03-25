import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import NavBar from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../urql/createUrqlClient";
import { toErrorsMap } from "../util/toErrorsMap";
import Head from "next/head";
import { uploadProfilePicture } from "../util/uploadProfilePicture";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <>
      <Head>
        <title>Tracky</title>
      </Head>
      <NavBar />
      <Wrapper variant="small">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            file: null,
          }}
          onSubmit={async (values, { setErrors }) => {
            let profilePictureUrl: string = await uploadProfilePicture(values);
            const response = await register({
              username: values.username,
              email: values.email,
              password: values.password,
              profilePictureUrl: profilePictureUrl,
            });
            if (response.data?.register.errors) {
              setErrors(toErrorsMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <input
                id="file"
                name="file"
                type="file"
                style={{
                  marginTop: "2vh",
                }}
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                className="form-control"
              />
              <Button
                mt={5}
                type="submit"
                isLoading={isSubmitting}
                bg="gray.800"
                border="1px"
                _hover={{ bg: "gray.500" }}
                color="white"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
