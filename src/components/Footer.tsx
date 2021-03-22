import { Link, Text } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#A9A9A9",
        paddingTop: "1vh",
        textAlign: "center",
      }}
    >
      <Link href="mailto:perstrackteam@gmail.com">
        <Text fontFamily="sans-serif">Get in touch!</Text>
      </Link>
    </div>
  );
};

export default Footer;
