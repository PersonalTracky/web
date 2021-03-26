import React from "react";
import NavBar from "./NavBar/NavBar";
import { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <div className="content">{children}</div>
    </>
  );
};
