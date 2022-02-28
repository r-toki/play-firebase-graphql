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

export type TweetItemFragment = { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } };

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

export type UsersForIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersForIndexPageQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, displayName: string }> };

export type MeForIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type MeForIndexPageQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export type FollowForIndexPageMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type FollowForIndexPageMutation = { __typename?: 'Mutation', follow: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export type UnFollowForIndexPageMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UnFollowForIndexPageMutation = { __typename?: 'Mutation', unFollow: { __typename?: 'User', id: string, followings: Array<{ __typename?: 'User', id: string, displayName: string }> } };

export type CurrentUserFragment = { __typename?: 'User', id: string, displayName: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, displayName: string } };

export type TweetEdgeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TweetEdgeQuery = { __typename?: 'Query', tweetEdge: { __typename?: 'TweetEdge', cursor: string, node: { __typename?: 'Tweet', id: string, content: string, createdAt: string, liked: boolean, postedBy: { __typename?: 'User', id: string, displayName: string } } } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, displayName: string } };

export const TweetItemFragmentDoc = gql`
    fragment tweetItem on Tweet {
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
    ...tweetItem
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
    mutation deleteTweet($id: ID!) {
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
    mutation updateTweet($id: ID!, $input: UpdateTweetInput!) {
  updateTweet(id: $id, input: $input) {
    id
    ...tweetItem
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
    mutation like($tweetId: ID!) {
  like(tweetId: $tweetId) {
    id
    ...tweetItem
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
    mutation unLike($tweetId: ID!) {
  unLike(tweetId: $tweetId) {
    id
    ...tweetItem
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
    mutation followForIndexPage($userId: ID!) {
  follow(userId: $userId) {
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
 *      userId: // value for 'userId'
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
    mutation unFollowForIndexPage($userId: ID!) {
  unFollow(userId: $userId) {
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
 *      userId: // value for 'userId'
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
    query currentUser {
  me {
    id
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
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
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
export const TweetEdgeDocument = gql`
    query tweetEdge($id: ID!) {
  tweetEdge(id: $id) {
    node {
      id
      ...tweetItem
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