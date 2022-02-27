import { gql } from "@apollo/client";

import { useFavoriteTweetsQuery, useFeedQuery } from "../graphql/generated";

gql`
  query feed($userId: ID!, $input: TweetsInput!) {
    user(id: $userId) {
      id
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

gql`
  query favoriteTweets($userId: ID!, $input: TweetsInput!) {
    user(id: $userId) {
      id
      favoriteTweets(input: $input) {
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

export const useFavoriteTweets = (userId: string) => {
  const { data, loading, fetchMore } = useFavoriteTweetsQuery({
    variables: { userId, input: { first: 10 } },
    notifyOnNetworkStatusChange: true,
  });

  const tweets = data?.user.favoriteTweets.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.user.favoriteTweets.pageInfo.hasNext;
  const endCursor = data?.user.favoriteTweets.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { userId, input: { first: 10, after: endCursor } } });
  };

  return { tweets, hasNext, loading, loadMore };
};
