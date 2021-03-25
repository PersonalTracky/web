import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/core";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React from "react";

interface NoteCardProps {
  cardText: string;
}
// TODO: implement note edit and delete
const NoteCard: React.FC<NoteCardProps> = ({ cardText }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mb={5}>
      <Box m="5" as="a">
        <Text m="5" mt="0">
          {cardText}
        </Text>
      </Box>
      <Flex ml={5} mb={2} justifyContent="space-between" mr={5}>
        <IconButton
          aria-label="edit"
          _hover={{ bg: "gray.500" }}
          icon={EditIcon}
        >
          Edit
        </IconButton>
        <IconButton
          aria-label="Delete"
          _hover={{ bg: "gray.500" }}
          icon={DeleteIcon}
        >
          Delete
        </IconButton>
      </Flex>
    </Box>
  );
};

export default NoteCard;
