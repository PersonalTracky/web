import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCreateNoteMutation, useNotesQuery } from "../generated/graphql";
import { InputField } from "./InputField";
import NoteCard from "./NoteCard";
import { Wrapper } from "./Wrapper";

interface NoteBlockProps {}

const NoteBlock: React.FC<NoteBlockProps> = ({}) => {
  const router = useRouter();
  const [{ data, error, fetching }] = useNotesQuery();
  const [, createNote] = useCreateNoteMutation();

  if (!fetching && !data) {
    return (
      <div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Wrapper mx="2vh">
      <Flex alignItems="center" justify="flex-start">
        <Heading mb={5}>Notes</Heading>
      </Flex>
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async (values) => {
          await createNote(values);
          router.reload();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Note"
                width={400}
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
              mb={10}
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack>
          {data!.notes.notes.map((n) =>
            !n ? null : <NoteCard cardText={n.text} />
          )}
        </Stack>
      )}
    </Wrapper>
  );
};

export default NoteBlock;
