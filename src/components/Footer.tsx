import { Link, Text } from "@chakra-ui/core";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="footer">
      <Link href="mailto:perstrackteam@gmail.com" textAlign="center">
        <Text fontFamily="sans-serif" color="white">
          Get in touch!
        </Text>
      </Link>
    </footer>
  );
};

export default Footer;
