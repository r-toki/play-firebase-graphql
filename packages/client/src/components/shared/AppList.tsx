import { Box } from "@chakra-ui/react";
import { ReactNode, VFC } from "react";

type AppListProps = {
  children: ReactNode;
};

export const AppList: VFC<AppListProps> = ({ children }) => {
  return (
    <Box borderWidth="1px" rounded="md">
      {children}
    </Box>
  );
};

type AppListItemProps = {
  children: ReactNode;
};

export const AppListItem: VFC<AppListItemProps> = ({ children }) => {
  return (
    <Box px="3" py="2" borderBottomWidth="1px" _last={{ borderBottomWidth: "0" }}>
      {children}
    </Box>
  );
};
