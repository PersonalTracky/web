import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input;
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} fontFamily="sans-serif">
        {label}
      </FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
