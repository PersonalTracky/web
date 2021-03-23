import { Box, Button } from "@chakra-ui/core";
import AWS from "aws-sdk";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/Footer";
import { InputField } from "../components/InputField";
import NavBar from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../urql/createUrqlClient";
import { toErrorsMap } from "../util/toErrorsMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <>
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
            // if user did not select a profile image, set it to default
            if (values.file) {
              const extension = values.file.name.split(".").pop();
              const s3 = new AWS.S3({
                accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_ACCESS_ID,
                secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_ACCESS_KEY,
                region: process.env.NEXT_PUBLIC_REACT_APP_REGION,
              });
              const params = {
                Bucket: process.env.NEXT_PUBLIC_REACT_APP_BUCKET_NAME,
                Key: "profile_pictures/pp_" + values.username + "." + extension,
                Body: values.file,
              };
              s3.upload(params, async function (err, data) {
                if (err) {
                  setErrors(toErrorsMap(err));
                }
                const url = data.Location;
                const response = await register({
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  profilePictureUrl: url,
                });
                if (response.data?.register.errors) {
                  setErrors(toErrorsMap(response.data.register.errors));
                } else if (response.data?.register.user) {
                  router.push("/");
                }
              });
            } else {
              const response = await register({
                username: values.username,
                email: values.email,
                password: values.password,
                profilePictureUrl: process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL,
              });
              if (response.data?.register.errors) {
                setErrors(toErrorsMap(response.data.register.errors));
              } else if (response.data?.register.user) {
                router.push("/");
              }
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
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                className="form-control"
              />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
