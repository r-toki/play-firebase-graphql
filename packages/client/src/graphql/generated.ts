import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type CreateTweetInput = {
  content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTweet: Tweet;
  deleteTweet: User;
  follow: User;
  like: Tweet;
  unFollow: User;
  unLike: Tweet;
  updateProfile: User;
  updateTweet: Tweet;
};


export type MutationCreateTweetArgs = {
  input: CreateTweetInput;
};


export type MutationDeleteTweetArgs = {
  id: Scalars['ID'];
};


export type MutationFollowArgs = {
  userId: Scalars['ID'];
};


export type MutationLikeArgs = {
  tweetId: Scalars['ID'];
};


export type MutationUnFollowArgs = {
  userId: Scalars['ID'];
};


export type MutationUnLikeArgs = {
  tweetId: Scalars['ID'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateTweetArgs = {
  id: Scalars['ID'];
  input: UpdateTweetInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNext: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  tweetEdge: TweetEdge;
  user: User;
  users: Array<User>;
};


export type QueryTweetEdgeArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export const Tweet_Filter = {
  Followings: 'FOLLOWINGS',
  Likes: 'LIKES',
  Self: 'SELF'
} as const;

export type Tweet_Filter = typeof Tweet_Filter[keyof typeof Tweet_Filter];
export type Tweet = {
  __typename?: 'Tweet';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  liked: Scalars['Boolean'];
  likedBy: Array<User>;
  postedBy: User;
};

export type TweetConnection = {
  __typename?: 'TweetConnection';
  edges: Array<TweetEdge>;
  pageInfo: PageInfo;
};

export type TweetEdge = {
  __typename?: 'TweetEdge';
  cursor: Scalars['String'];
  node: Tweet;
};

export type TweetsInput = {
  after?: InputMaybe<Scalars['String']>;
  filters: Array<Tweet_Filter>;
  first: Scalars['Int'];
};

export type UpdateProfileInput = {
  displayName: Scalars['String'];
};

export type UpdateTweetInput = {
  content: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  followers: Array<User>;
  followings: Array<User>;
  id: Scalars['String'];
  tweets: TweetConnection;
};


export type UserTweetsArgs = {
  input: TweetsInput;
};

export type CreateTweetMutationVariables = Exact<{
  input: CreateTweetInput;
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet: { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } } };

export type DeleteTweetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTweetMutation = { __typename?: 'Mutation', deleteTweet: { __typename?: 'User', id: string } };

export type UpdateTweetMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateTweetInput;
}>;


export type UpdateTweetMutation = { __typename?: 'Mutation', updateTweet: { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } } };

export type LikeMutationVariables = Exact<{
  tweetId: Scalars['ID'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } } };

export type UnLikeMutationVariables = Exact<{
  tweetId: Scalars['ID'];
}>;


export type UnLikeMutation = { __typename?: 'Mutation', unLike: { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } } };

export type TweetItemFragment = { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } };

export type UserNameFragment = { __typename?: 'User', id: string, displayName: string };

export type FollowMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export type UnFollowMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UnFollowMutation = { __typename?: 'Mutation', unFollow: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export type UserForUsersFragment = { __typename?: 'User', id: string, displayName: string };

export type MeForUsersFragment = { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> };

export type CurrentUserContextFragment = { __typename?: 'User', id: string, displayName: string };

export type MeForCurrentUserContextQueryVariables = Exact<{ [key: string]: never; }>;


export type MeForCurrentUserContextQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, displayName: string } };

export type TweetsQueryVariables = Exact<{
  userId: Scalars['ID'];
  input: TweetsInput;
}>;


export type TweetsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, tweets: { __typename?: 'TweetConnection', edges: Array<{ __typename?: 'TweetEdge', cursor: string, node: { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNext: boolean, endCursor?: string | null } } } };

export type TweetEdgeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TweetEdgeQuery = { __typename?: 'Query', tweetEdge: { __typename?: 'TweetEdge', cursor: string, node: { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } } } };

export type UserForTweetsSubscriptionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserForTweetsSubscriptionQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string }> } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, displayName: string } };

export type UserForUserPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserForUserPageQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, displayName: string } };

export type UsersForUserPageQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersForUserPageQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, displayName: string }> };

export type MeForUserPageQueryVariables = Exact<{ [key: string]: never; }>;


export type MeForUserPageQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export const TweetItemFragmentDoc = gql`
    fragment TweetItem on Tweet {
  id
  content
  createdAt
  postedBy {
    id
    displayName
  }
  liked
}
    `;
export const UserNameFragmentDoc = gql`
    fragment UserName on User {
  id
  displayName
}
    `;
export const UserForUsersFragmentDoc = gql`
    fragment UserForUsers on User {
  id
  displayName
}
    `;
export const MeForUsersFragmentDoc = gql`
    fragment MeForUsers on User {
  id
  followings {
    id
    ...UserForUsers
  }
}
    ${UserForUsersFragmentDoc}`;
export const CurrentUserContextFragmentDoc = gql`
    fragment currentUserContext on User {
  id
  displayName
}
    `;
export const CreateTweetDocument = gql`
    mutation CreateTweet($input: CreateTweetInput!) {
  createTweet(input: $input) {
    id
    ...TweetItem
  }
}
    ${TweetItemFragmentDoc}`;
export type CreateTweetMutationFn = Apollo.MutationFunction<CreateTweetMutation, CreateTweetMutationVariables>;

/**
 * __useCreateTweetMutation__
 *
 * To run a mutation, you first call `useCreateTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTweetMutation, { data, loading, error }] = useCreateTweetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTweetMutation(baseOptions?: Apollo.MutationHookOptions<CreateTweetMutation, CreateTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument, options);
      }
export type CreateTweetMutationHookResult = ReturnType<typeof useCreateTweetMutation>;
export type CreateTweetMutationResult = Apollo.MutationResult<CreateTweetMutation>;
export type CreateTweetMutationOptions = Apollo.BaseMutationOptions<CreateTweetMutation, CreateTweetMutationVariables>;
export const DeleteTweetDocument = gql`
    mutation DeleteTweet($id: ID!) {
  deleteTweet(id: $id) {
    id
  }
}
    `;
export type DeleteTweetMutationFn = Apollo.MutationFunction<DeleteTweetMutation, DeleteTweetMutationVariables>;

/**
 * __useDeleteTweetMutation__
 *
 * To run a mutation, you first call `useDeleteTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTweetMutation, { data, loading, error }] = useDeleteTweetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTweetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTweetMutation, DeleteTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTweetMutation, DeleteTweetMutationVariables>(DeleteTweetDocument, options);
      }
export type DeleteTweetMutationHookResult = ReturnType<typeof useDeleteTweetMutation>;
export type DeleteTweetMutationResult = Apollo.MutationResult<DeleteTweetMutation>;
export type DeleteTweetMutationOptions = Apollo.BaseMutationOptions<DeleteTweetMutation, DeleteTweetMutationVariables>;
export const UpdateTweetDocument = gql`
    mutation UpdateTweet($id: ID!, $input: UpdateTweetInput!) {
  updateTweet(id: $id, input: $input) {
    id
    ...TweetItem
  }
}
    ${TweetItemFragmentDoc}`;
export type UpdateTweetMutationFn = Apollo.MutationFunction<UpdateTweetMutation, UpdateTweetMutationVariables>;

/**
 * __useUpdateTweetMutation__
 *
 * To run a mutation, you first call `useUpdateTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTweetMutation, { data, loading, error }] = useUpdateTweetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTweetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTweetMutation, UpdateTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTweetMutation, UpdateTweetMutationVariables>(UpdateTweetDocument, options);
      }
export type UpdateTweetMutationHookResult = ReturnType<typeof useUpdateTweetMutation>;
export type UpdateTweetMutationResult = Apollo.MutationResult<UpdateTweetMutation>;
export type UpdateTweetMutationOptions = Apollo.BaseMutationOptions<UpdateTweetMutation, UpdateTweetMutationVariables>;
export const LikeDocument = gql`
    mutation Like($tweetId: ID!) {
  like(tweetId: $tweetId) {
    id
    ...TweetItem
  }
}
    ${TweetItemFragmentDoc}`;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const UnLikeDocument = gql`
    mutation UnLike($tweetId: ID!) {
  unLike(tweetId: $tweetId) {
    id
    ...TweetItem
  }
}
    ${TweetItemFragmentDoc}`;
export type UnLikeMutationFn = Apollo.MutationFunction<UnLikeMutation, UnLikeMutationVariables>;

/**
 * __useUnLikeMutation__
 *
 * To run a mutation, you first call `useUnLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unLikeMutation, { data, loading, error }] = useUnLikeMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useUnLikeMutation(baseOptions?: Apollo.MutationHookOptions<UnLikeMutation, UnLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnLikeMutation, UnLikeMutationVariables>(UnLikeDocument, options);
      }
export type UnLikeMutationHookResult = ReturnType<typeof useUnLikeMutation>;
export type UnLikeMutationResult = Apollo.MutationResult<UnLikeMutation>;
export type UnLikeMutationOptions = Apollo.BaseMutationOptions<UnLikeMutation, UnLikeMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($userId: ID!) {
  follow(userId: $userId) {
    id
    followings {
      id
      ...UserForUsers
    }
  }
}
    ${UserForUsersFragmentDoc}`;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const UnFollowDocument = gql`
    mutation UnFollow($userId: ID!) {
  unFollow(userId: $userId) {
    id
    followings {
      id
      ...UserForUsers
    }
  }
}
    ${UserForUsersFragmentDoc}`;
export type UnFollowMutationFn = Apollo.MutationFunction<UnFollowMutation, UnFollowMutationVariables>;

/**
 * __useUnFollowMutation__
 *
 * To run a mutation, you first call `useUnFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowMutation, { data, loading, error }] = useUnFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnFollowMutation(baseOptions?: Apollo.MutationHookOptions<UnFollowMutation, UnFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFollowMutation, UnFollowMutationVariables>(UnFollowDocument, options);
      }
export type UnFollowMutationHookResult = ReturnType<typeof useUnFollowMutation>;
export type UnFollowMutationResult = Apollo.MutationResult<UnFollowMutation>;
export type UnFollowMutationOptions = Apollo.BaseMutationOptions<UnFollowMutation, UnFollowMutationVariables>;
export const MeForCurrentUserContextDocument = gql`
    query meForCurrentUserContext {
  me {
    id
    ...currentUserContext
  }
}
    ${CurrentUserContextFragmentDoc}`;

/**
 * __useMeForCurrentUserContextQuery__
 *
 * To run a query within a React component, call `useMeForCurrentUserContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeForCurrentUserContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeForCurrentUserContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeForCurrentUserContextQuery(baseOptions?: Apollo.QueryHookOptions<MeForCurrentUserContextQuery, MeForCurrentUserContextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeForCurrentUserContextQuery, MeForCurrentUserContextQueryVariables>(MeForCurrentUserContextDocument, options);
      }
export function useMeForCurrentUserContextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeForCurrentUserContextQuery, MeForCurrentUserContextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeForCurrentUserContextQuery, MeForCurrentUserContextQueryVariables>(MeForCurrentUserContextDocument, options);
        }
export type MeForCurrentUserContextQueryHookResult = ReturnType<typeof useMeForCurrentUserContextQuery>;
export type MeForCurrentUserContextLazyQueryHookResult = ReturnType<typeof useMeForCurrentUserContextLazyQuery>;
export type MeForCurrentUserContextQueryResult = Apollo.QueryResult<MeForCurrentUserContextQuery, MeForCurrentUserContextQueryVariables>;
export const TweetsDocument = gql`
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
    ${TweetItemFragmentDoc}`;

/**
 * __useTweetsQuery__
 *
 * To run a query within a React component, call `useTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTweetsQuery(baseOptions: Apollo.QueryHookOptions<TweetsQuery, TweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TweetsQuery, TweetsQueryVariables>(TweetsDocument, options);
      }
export function useTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetsQuery, TweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TweetsQuery, TweetsQueryVariables>(TweetsDocument, options);
        }
export type TweetsQueryHookResult = ReturnType<typeof useTweetsQuery>;
export type TweetsLazyQueryHookResult = ReturnType<typeof useTweetsLazyQuery>;
export type TweetsQueryResult = Apollo.QueryResult<TweetsQuery, TweetsQueryVariables>;
export const TweetEdgeDocument = gql`
    query TweetEdge($id: ID!) {
  tweetEdge(id: $id) {
    node {
      id
      ...TweetItem
    }
    cursor
  }
}
    ${TweetItemFragmentDoc}`;

/**
 * __useTweetEdgeQuery__
 *
 * To run a query within a React component, call `useTweetEdgeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetEdgeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetEdgeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTweetEdgeQuery(baseOptions: Apollo.QueryHookOptions<TweetEdgeQuery, TweetEdgeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TweetEdgeQuery, TweetEdgeQueryVariables>(TweetEdgeDocument, options);
      }
export function useTweetEdgeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetEdgeQuery, TweetEdgeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TweetEdgeQuery, TweetEdgeQueryVariables>(TweetEdgeDocument, options);
        }
export type TweetEdgeQueryHookResult = ReturnType<typeof useTweetEdgeQuery>;
export type TweetEdgeLazyQueryHookResult = ReturnType<typeof useTweetEdgeLazyQuery>;
export type TweetEdgeQueryResult = Apollo.QueryResult<TweetEdgeQuery, TweetEdgeQueryVariables>;
export const UserForTweetsSubscriptionDocument = gql`
    query UserForTweetsSubscription($id: ID!) {
  user(id: $id) {
    id
    followings {
      id
    }
  }
}
    `;

/**
 * __useUserForTweetsSubscriptionQuery__
 *
 * To run a query within a React component, call `useUserForTweetsSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserForTweetsSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserForTweetsSubscriptionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserForTweetsSubscriptionQuery(baseOptions: Apollo.QueryHookOptions<UserForTweetsSubscriptionQuery, UserForTweetsSubscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserForTweetsSubscriptionQuery, UserForTweetsSubscriptionQueryVariables>(UserForTweetsSubscriptionDocument, options);
      }
export function useUserForTweetsSubscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserForTweetsSubscriptionQuery, UserForTweetsSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserForTweetsSubscriptionQuery, UserForTweetsSubscriptionQueryVariables>(UserForTweetsSubscriptionDocument, options);
        }
export type UserForTweetsSubscriptionQueryHookResult = ReturnType<typeof useUserForTweetsSubscriptionQuery>;
export type UserForTweetsSubscriptionLazyQueryHookResult = ReturnType<typeof useUserForTweetsSubscriptionLazyQuery>;
export type UserForTweetsSubscriptionQueryResult = Apollo.QueryResult<UserForTweetsSubscriptionQuery, UserForTweetsSubscriptionQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    ...currentUserContext
  }
}
    ${CurrentUserContextFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UserForUserPageDocument = gql`
    query UserForUserPage($id: ID!) {
  user(id: $id) {
    id
    ...UserName
  }
}
    ${UserNameFragmentDoc}`;

/**
 * __useUserForUserPageQuery__
 *
 * To run a query within a React component, call `useUserForUserPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserForUserPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserForUserPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserForUserPageQuery(baseOptions: Apollo.QueryHookOptions<UserForUserPageQuery, UserForUserPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserForUserPageQuery, UserForUserPageQueryVariables>(UserForUserPageDocument, options);
      }
export function useUserForUserPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserForUserPageQuery, UserForUserPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserForUserPageQuery, UserForUserPageQueryVariables>(UserForUserPageDocument, options);
        }
export type UserForUserPageQueryHookResult = ReturnType<typeof useUserForUserPageQuery>;
export type UserForUserPageLazyQueryHookResult = ReturnType<typeof useUserForUserPageLazyQuery>;
export type UserForUserPageQueryResult = Apollo.QueryResult<UserForUserPageQuery, UserForUserPageQueryVariables>;
export const UsersForUserPageDocument = gql`
    query UsersForUserPage {
  users {
    id
    ...UserForUsers
  }
}
    ${UserForUsersFragmentDoc}`;

/**
 * __useUsersForUserPageQuery__
 *
 * To run a query within a React component, call `useUsersForUserPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersForUserPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersForUserPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersForUserPageQuery(baseOptions?: Apollo.QueryHookOptions<UsersForUserPageQuery, UsersForUserPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersForUserPageQuery, UsersForUserPageQueryVariables>(UsersForUserPageDocument, options);
      }
export function useUsersForUserPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersForUserPageQuery, UsersForUserPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersForUserPageQuery, UsersForUserPageQueryVariables>(UsersForUserPageDocument, options);
        }
export type UsersForUserPageQueryHookResult = ReturnType<typeof useUsersForUserPageQuery>;
export type UsersForUserPageLazyQueryHookResult = ReturnType<typeof useUsersForUserPageLazyQuery>;
export type UsersForUserPageQueryResult = Apollo.QueryResult<UsersForUserPageQuery, UsersForUserPageQueryVariables>;
export const MeForUserPageDocument = gql`
    query MeForUserPage {
  me {
    id
    ...MeForUsers
  }
}
    ${MeForUsersFragmentDoc}`;

/**
 * __useMeForUserPageQuery__
 *
 * To run a query within a React component, call `useMeForUserPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeForUserPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeForUserPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeForUserPageQuery(baseOptions?: Apollo.QueryHookOptions<MeForUserPageQuery, MeForUserPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeForUserPageQuery, MeForUserPageQueryVariables>(MeForUserPageDocument, options);
      }
export function useMeForUserPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeForUserPageQuery, MeForUserPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeForUserPageQuery, MeForUserPageQueryVariables>(MeForUserPageDocument, options);
        }
export type MeForUserPageQueryHookResult = ReturnType<typeof useMeForUserPageQuery>;
export type MeForUserPageLazyQueryHookResult = ReturnType<typeof useMeForUserPageLazyQuery>;
export type MeForUserPageQueryResult = Apollo.QueryResult<MeForUserPageQuery, MeForUserPageQueryVariables>;