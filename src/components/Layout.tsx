import React from "react";
import { Navigation } from "./Navigation";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navigation />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
