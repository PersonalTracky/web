import { Button, Flex, Image } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import NoteBlock from "../components/NotesBlock";
import { Wrapper } from "../components/Wrapper";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../urql/createUrqlClient";
import { isServer } from "../util/isServer";
import { uploadProfilePicture } from "../util/uploadProfilePicture";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;
  if (data?.me) {
    body = (
      <Flex>
        <Wrapper variant="small" mx="10vh">
          <Image
            size="200px"
            src={data.me?.profilePictureUrl}
            alt="Profile Picture"
            rounded="1em"
          />
          <Wrapper variant="small">
            <Formik
              initialValues={{
                file: null,
              }}
              onSubmit={async (values, {}) => {
                let profilePictureUrl: string = await uploadProfilePicture({
                  username: data.me?.username,
                  file: values.file,
                });
                // TODO: handle changing profile picture
                console.log(profilePictureUrl);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
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
                    Change Profile Picture
                  </Button>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </Wrapper>
        <NoteBlock />
      </Flex>
    );
  }
  return (
    <>
      <Head>
        <title>Tracky</title>
        <link rel="shortcut icon" href="/Logo.svg" />
      </Head>
      <NavBar />
      {body}
      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Profile);
