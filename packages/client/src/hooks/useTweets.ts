import { gql } from "@apollo/client";
import { useEffect } from "react";

import { Tweet_Filter, useTweetsQuery } from "./../graphql/generated";

gql`
  query tweets($userId: ID!, $input: TweetsInput!) {
    user(id: $userId) {
      id
      tweets(input: $input) {
        edges {
          node {
            id
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

export const useTweets = (userId: string, filters: Tweet_Filter[]) => {
  const { data, loading, fetchMore, refetch } = useTweetsQuery({
    variables: { userId, input: { first: 10, filters } },
    notifyOnNetworkStatusChange: true,
  });

  const tweets = data?.user.tweets.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.user.tweets.pageInfo.hasNext ?? false;
  const endCursor = data?.user.tweets.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { userId, input: { first: 10, after: endCursor, filters } } });
  };

  // useEffect(() => {
  //   if (!data) return;
  //   refetch();
  // }, [filters]);

  return { tweets, hasNext, loading, loadMore };
};
