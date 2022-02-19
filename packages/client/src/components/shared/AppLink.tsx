import { Link, LinkProps } from "@chakra-ui/react";
import { VFC } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

export const AppLink: VFC<LinkProps & RouterLinkProps> = (props) => {
  return <Link as={RouterLink} _hover={{ textDecoration: "none" }} {...props} />;
};
