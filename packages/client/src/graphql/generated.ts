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

export type FollowInput = {
  followedId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTweet: Tweet;
  follow: User;
  unFollow: User;
  updateProfile: User;
};


export type MutationCreateTweetArgs = {
  input: CreateTweetInput;
};


export type MutationFollowArgs = {
  input: FollowInput;
};


export type MutationUnFollowArgs = {
  input: UnFollowInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNext: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  feed: TweetConnection;
  me: User;
  oneOfFeed: TweetEdge;
  tweet: Tweet;
  user: User;
  users: Array<User>;
};


export type QueryFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};


export type QueryOneOfFeedArgs = {
  id: Scalars['ID'];
};


export type QueryTweetArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Tweet = {
  __typename?: 'Tweet';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
  id: Scalars['String'];
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

export type UnFollowInput = {
  followedId: Scalars['String'];
};

export type UpdateProfileInput = {
  displayName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  followers: Array<User>;
  followings: Array<User>;
  id: Scalars['String'];
  tweets: Array<Tweet>;
};

export type CreateTweetMutationVariables = Exact<{
  input: CreateTweetInput;
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet: { __typename?: 'Tweet', id: string, content: string, createdAt: string, creator: { __typename?: 'User', id: string, displayName: string } } };

export type UsersForIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersForIndexPageQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, displayName: string }> };

export type MeForIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type MeForIndexPageQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export type FollowForIndexPageMutationVariables = Exact<{
  input: FollowInput;
}>;


export type FollowForIndexPageMutation = { __typename?: 'Mutation', follow: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export type UnFollowForIndexPageMutationVariables = Exact<{
  input: UnFollowInput;
}>;


export type UnFollowForIndexPageMutation = { __typename?: 'Mutation', unFollow: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export type CurrentUserFragment = { __typename?: 'User', id: string, displayName: string };

export type CurrentUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CurrentUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, displayName: string } };

export type FeedForIndexPageQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type FeedForIndexPageQuery = { __typename?: 'Query', feed: { __typename?: 'TweetConnection', edges: Array<{ __typename?: 'TweetEdge', cursor: string, node: { __typename?: 'Tweet', id: string, content: string, createdAt: string, creator: { __typename?: 'User', id: string, displayName: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNext: boolean, endCursor?: string | null } } };

export type OneOfFeedForIndexPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OneOfFeedForIndexPageQuery = { __typename?: 'Query', oneOfFeed: { __typename?: 'TweetEdge', cursor: string, node: { __typename?: 'Tweet', id: string, content: string, createdAt: string, creator: { __typename?: 'User', id: string, displayName: string } } } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, displayName: string } };

export const CurrentUserFragmentDoc = gql`
    fragment currentUser on User {
  id
  displayName
}
    `;
export const CreateTweetDocument = gql`
    mutation createTweet($input: CreateTweetInput!) {
  createTweet(input: $input) {
    id
    content
    createdAt
    creator {
      id
      displayName
    }
  }
}
    `;
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
export const UsersForIndexPageDocument = gql`
    query usersForIndexPage {
  users {
    id
    displayName
  }
}
    `;

/**
 * __useUsersForIndexPageQuery__
 *
 * To run a query within a React component, call `useUsersForIndexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersForIndexPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersForIndexPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersForIndexPageQuery(baseOptions?: Apollo.QueryHookOptions<UsersForIndexPageQuery, UsersForIndexPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersForIndexPageQuery, UsersForIndexPageQueryVariables>(UsersForIndexPageDocument, options);
      }
export function useUsersForIndexPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersForIndexPageQuery, UsersForIndexPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersForIndexPageQuery, UsersForIndexPageQueryVariables>(UsersForIndexPageDocument, options);
        }
export type UsersForIndexPageQueryHookResult = ReturnType<typeof useUsersForIndexPageQuery>;
export type UsersForIndexPageLazyQueryHookResult = ReturnType<typeof useUsersForIndexPageLazyQuery>;
export type UsersForIndexPageQueryResult = Apollo.QueryResult<UsersForIndexPageQuery, UsersForIndexPageQueryVariables>;
export const MeForIndexPageDocument = gql`
    query meForIndexPage {
  me {
    id
    followings {
      id
      displayName
    }
  }
}
    `;

/**
 * __useMeForIndexPageQuery__
 *
 * To run a query within a React component, call `useMeForIndexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeForIndexPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeForIndexPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeForIndexPageQuery(baseOptions?: Apollo.QueryHookOptions<MeForIndexPageQuery, MeForIndexPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeForIndexPageQuery, MeForIndexPageQueryVariables>(MeForIndexPageDocument, options);
      }
export function useMeForIndexPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeForIndexPageQuery, MeForIndexPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeForIndexPageQuery, MeForIndexPageQueryVariables>(MeForIndexPageDocument, options);
        }
export type MeForIndexPageQueryHookResult = ReturnType<typeof useMeForIndexPageQuery>;
export type MeForIndexPageLazyQueryHookResult = ReturnType<typeof useMeForIndexPageLazyQuery>;
export type MeForIndexPageQueryResult = Apollo.QueryResult<MeForIndexPageQuery, MeForIndexPageQueryVariables>;
export const FollowForIndexPageDocument = gql`
    mutation followForIndexPage($input: FollowInput!) {
  follow(input: $input) {
    id
    followings {
      id
      displayName
    }
  }
}
    `;
export type FollowForIndexPageMutationFn = Apollo.MutationFunction<FollowForIndexPageMutation, FollowForIndexPageMutationVariables>;

/**
 * __useFollowForIndexPageMutation__
 *
 * To run a mutation, you first call `useFollowForIndexPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowForIndexPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followForIndexPageMutation, { data, loading, error }] = useFollowForIndexPageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFollowForIndexPageMutation(baseOptions?: Apollo.MutationHookOptions<FollowForIndexPageMutation, FollowForIndexPageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowForIndexPageMutation, FollowForIndexPageMutationVariables>(FollowForIndexPageDocument, options);
      }
export type FollowForIndexPageMutationHookResult = ReturnType<typeof useFollowForIndexPageMutation>;
export type FollowForIndexPageMutationResult = Apollo.MutationResult<FollowForIndexPageMutation>;
export type FollowForIndexPageMutationOptions = Apollo.BaseMutationOptions<FollowForIndexPageMutation, FollowForIndexPageMutationVariables>;
export const UnFollowForIndexPageDocument = gql`
    mutation unFollowForIndexPage($input: UnFollowInput!) {
  unFollow(input: $input) {
    id
    followings {
      id
      displayName
    }
  }
}
    `;
export type UnFollowForIndexPageMutationFn = Apollo.MutationFunction<UnFollowForIndexPageMutation, UnFollowForIndexPageMutationVariables>;

/**
 * __useUnFollowForIndexPageMutation__
 *
 * To run a mutation, you first call `useUnFollowForIndexPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowForIndexPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowForIndexPageMutation, { data, loading, error }] = useUnFollowForIndexPageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnFollowForIndexPageMutation(baseOptions?: Apollo.MutationHookOptions<UnFollowForIndexPageMutation, UnFollowForIndexPageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFollowForIndexPageMutation, UnFollowForIndexPageMutationVariables>(UnFollowForIndexPageDocument, options);
      }
export type UnFollowForIndexPageMutationHookResult = ReturnType<typeof useUnFollowForIndexPageMutation>;
export type UnFollowForIndexPageMutationResult = Apollo.MutationResult<UnFollowForIndexPageMutation>;
export type UnFollowForIndexPageMutationOptions = Apollo.BaseMutationOptions<UnFollowForIndexPageMutation, UnFollowForIndexPageMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser($id: ID!) {
  user(id: $id) {
    ...currentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const FeedForIndexPageDocument = gql`
    query FeedForIndexPage($first: Int!, $after: String) {
  feed(first: $first, after: $after) {
    edges {
      node {
        id
        content
        createdAt
        creator {
          id
          displayName
        }
      }
      cursor
    }
    pageInfo {
      hasNext
      endCursor
    }
  }
}
    `;

/**
 * __useFeedForIndexPageQuery__
 *
 * To run a query within a React component, call `useFeedForIndexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedForIndexPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedForIndexPageQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFeedForIndexPageQuery(baseOptions: Apollo.QueryHookOptions<FeedForIndexPageQuery, FeedForIndexPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedForIndexPageQuery, FeedForIndexPageQueryVariables>(FeedForIndexPageDocument, options);
      }
export function useFeedForIndexPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedForIndexPageQuery, FeedForIndexPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedForIndexPageQuery, FeedForIndexPageQueryVariables>(FeedForIndexPageDocument, options);
        }
export type FeedForIndexPageQueryHookResult = ReturnType<typeof useFeedForIndexPageQuery>;
export type FeedForIndexPageLazyQueryHookResult = ReturnType<typeof useFeedForIndexPageLazyQuery>;
export type FeedForIndexPageQueryResult = Apollo.QueryResult<FeedForIndexPageQuery, FeedForIndexPageQueryVariables>;
export const OneOfFeedForIndexPageDocument = gql`
    query oneOfFeedForIndexPage($id: ID!) {
  oneOfFeed(id: $id) {
    node {
      id
      content
      createdAt
      creator {
        id
        displayName
      }
    }
    cursor
  }
}
    `;

/**
 * __useOneOfFeedForIndexPageQuery__
 *
 * To run a query within a React component, call `useOneOfFeedForIndexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useOneOfFeedForIndexPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOneOfFeedForIndexPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOneOfFeedForIndexPageQuery(baseOptions: Apollo.QueryHookOptions<OneOfFeedForIndexPageQuery, OneOfFeedForIndexPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OneOfFeedForIndexPageQuery, OneOfFeedForIndexPageQueryVariables>(OneOfFeedForIndexPageDocument, options);
      }
export function useOneOfFeedForIndexPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OneOfFeedForIndexPageQuery, OneOfFeedForIndexPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OneOfFeedForIndexPageQuery, OneOfFeedForIndexPageQueryVariables>(OneOfFeedForIndexPageDocument, options);
        }
export type OneOfFeedForIndexPageQueryHookResult = ReturnType<typeof useOneOfFeedForIndexPageQuery>;
export type OneOfFeedForIndexPageLazyQueryHookResult = ReturnType<typeof useOneOfFeedForIndexPageLazyQuery>;
export type OneOfFeedForIndexPageQueryResult = Apollo.QueryResult<OneOfFeedForIndexPageQuery, OneOfFeedForIndexPageQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    displayName
  }
}
    `;
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