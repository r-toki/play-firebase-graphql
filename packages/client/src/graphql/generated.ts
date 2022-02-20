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

export type Query = {
  __typename?: 'Query';
  tweets: Array<Tweet>;
  users: Array<User>;
};

export type Tweet = {
  __typename?: 'Tweet';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  id: Scalars['String'];
  tweets: Array<Tweet>;
};

export type TweetsForIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type TweetsForIndexPageQuery = { __typename?: 'Query', tweets: Array<{ __typename?: 'Tweet', id: string, content: string, createdAt: string, creator: { __typename?: 'User', id: string, displayName: string } }> };

export type UsersForIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersForIndexPageQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, displayName: string }> };


export const TweetsForIndexPageDocument = gql`
    query tweetsForIndexPage {
  tweets {
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

/**
 * __useTweetsForIndexPageQuery__
 *
 * To run a query within a React component, call `useTweetsForIndexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetsForIndexPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetsForIndexPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useTweetsForIndexPageQuery(baseOptions?: Apollo.QueryHookOptions<TweetsForIndexPageQuery, TweetsForIndexPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TweetsForIndexPageQuery, TweetsForIndexPageQueryVariables>(TweetsForIndexPageDocument, options);
      }
export function useTweetsForIndexPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetsForIndexPageQuery, TweetsForIndexPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TweetsForIndexPageQuery, TweetsForIndexPageQueryVariables>(TweetsForIndexPageDocument, options);
        }
export type TweetsForIndexPageQueryHookResult = ReturnType<typeof useTweetsForIndexPageQuery>;
export type TweetsForIndexPageLazyQueryHookResult = ReturnType<typeof useTweetsForIndexPageLazyQuery>;
export type TweetsForIndexPageQueryResult = Apollo.QueryResult<TweetsForIndexPageQuery, TweetsForIndexPageQueryVariables>;
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