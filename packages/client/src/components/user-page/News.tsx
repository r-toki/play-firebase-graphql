import { Box, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { AppList, AppListItem } from "../shared/AppList";

export const News: VFC = () => {
  const news = [
    { id: "1", title: "mock-news-1" },
    { id: "2", title: "mock-news-2" },
  ];

  return (
    <Stack>
      <Box alignSelf="center" fontWeight="bold">
        News
      </Box>
      {news.length && (
        <AppList>
          {news.map((topic) => (
            <AppListItem key={topic.id}>
              <Box fontWeight="bold">{topic.title}</Box>
            </AppListItem>
          ))}
        </AppList>
      )}
    </Stack>
  );
};
