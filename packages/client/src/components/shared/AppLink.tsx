import { Link } from "@chakra-ui/react";
import { VFC } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

export const AppLink: VFC<LinkProps> = (props) => {
  return <Link as={RouterLink} _hover={{ textDecoration: "none" }} {...props} />;
};
