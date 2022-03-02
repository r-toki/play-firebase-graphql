import { gql } from "@apollo/client";

import { Tweet_Filter, useTweetsLazyQuery } from "./../graphql/generated";

gql`
  query Tweets($userId: ID!, $input: TweetsInput!) {
    user(id: $userId) {
      id
      tweets(input: $input) {
        edges {
          node {
            id
            ...TweetItem
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
  const [fetch, { data, loading, fetchMore }] = useTweetsLazyQuery({
    variables: { userId, input: { first: 10, filters } },
    notifyOnNetworkStatusChange: true,
  });

  const tweets = data?.user.tweets.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.user.tweets.pageInfo.hasNext ?? false;
  const endCursor = data?.user.tweets.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { userId, input: { first: 10, after: endCursor, filters } } });
  };

  return { tweets, hasNext, loading, loadMore, fetch };
};
