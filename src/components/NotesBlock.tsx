import { Button, Flex, Heading, Stack } from "@chakra-ui/core";
import React, { useState } from "react";
import { useNotesQuery } from "../generated/graphql";
import NoteCard from "./NoteCard";
import { Wrapper } from "./Wrapper";

interface NoteBlockProps {}

const NoteBlock: React.FC<NoteBlockProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 3,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = useNotesQuery({
    variables,
  });

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
        {data && data.notes.hasMore ? (
          <Button
            ml={40}
            type="submit"
            bg="gray.800"
            border="1px"
            _hover={{ bg: "gray.500" }}
            color="white"
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.notes.notes[data.notes.notes.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
          >
            Load more
          </Button>
        ) : null}
      </Flex>
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
