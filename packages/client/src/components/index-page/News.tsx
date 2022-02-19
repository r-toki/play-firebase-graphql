import { Box, Stack } from "@chakra-ui/react";
import { VFC } from "react";

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
      <Box borderWidth="1px" rounded="md">
        {news.map((topic) => (
          <Box
            key={topic.id}
            px="3"
            py="2"
            borderBottomWidth="1px"
            _last={{ borderBottomWidth: "0" }}
          >
            <Box fontWeight="bold">{topic.title}</Box>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};
