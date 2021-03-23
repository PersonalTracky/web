import { Link, Text } from "@chakra-ui/core";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#30363d",
        paddingTop: "2vh",
        textAlign: "center",
        paddingBottom:"1vh"
      }}
    >
      <Link href="mailto:perstrackteam@gmail.com" textAlign="center">
        <Text fontFamily="sans-serif" color="white">Get in touch!</Text>
      </Link>
    </div>
  );
};

export default Footer;
