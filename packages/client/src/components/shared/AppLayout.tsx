import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, VFC } from "react";

type AppLayoutProps = {
  main: ReactNode;
  left: ReactNode;
  right: ReactNode;
};

export const AppLayout: VFC<AppLayoutProps> = ({ main, left, right }) => {
  return (
    <Box h="100vh">
      <Box w="25%" h="full" position="fixed">
        <Flex h="full" justifyContent="end">
          {left}
        </Flex>
      </Box>
      <Box w="50%" h="full" position="absolute" left="25%">
        <Flex h="full" flexDirection="column" alignItems="center">
          {main}
        </Flex>
      </Box>
      <Box w="25%" h="full" position="fixed" left="75%">
        <Flex h="full" justifyContent="start">
          {right}
        </Flex>
      </Box>
    </Box>
  );
};
