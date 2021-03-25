import { Box } from "@chakra-ui/core";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
  border?: string;
  borderColor?: string;
  mx?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  border,
  borderColor,
  mx,
}) => {
  return (
    <Box
      mt={8}
      mx={mx ? mx : "auto"}
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      border={border}
      borderColor={borderColor}
    >
      {children}
    </Box>
  );
};
