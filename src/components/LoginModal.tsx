import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorsMap } from "../util/toErrorsMap";
import { InputField } from "./InputField";
import { Wrapper } from "./Wrapper";

interface LoginModalProps {}

export const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const [, login] = useLoginMutation();
  const { isOpen, onClose } = useDisclosure();
  return (
    <>
      
    </>
  );
};
