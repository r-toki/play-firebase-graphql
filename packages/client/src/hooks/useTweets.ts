import { gql } from "@apollo/client";

import { useFeedQuery } from "../graphql/generated";

gql`
  fragment tweetItem on Tweet {
    id
    content
    createdAt
    creator {
      id
      displayName
    }
    favorite
  }

  query feed($userId: ID!, $input: TweetsInput!) {
    user(id: $userId) {
      feed(input: $input) {
        edges {
          node {
            ...tweetItem
          }
          cursor
        }
        pageInfo {
          hasNext
          endCursor
        }
      }
    }
  }
`;

export const useFeed = (userId: string) => {
  const { data, loading, fetchMore } = useFeedQuery({
    variables: { userId, input: { first: 10 } },
    notifyOnNetworkStatusChange: true,
  });

  const tweets = data?.user.feed.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.user.feed.pageInfo.hasNext;
  const endCursor = data?.user.feed.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { userId, input: { first: 10, after: endCursor } } });
  };

  return { tweets, hasNext, loading, loadMore };
};
