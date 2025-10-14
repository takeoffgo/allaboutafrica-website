import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AcceptQuoteInput = {
  accepted: Scalars['Boolean']['input'];
  date: Scalars['String']['input'];
  email: Scalars['String']['input'];
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type AcceptQuoteResponse = {
  __typename?: 'AcceptQuoteResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptQuote: AcceptQuoteResponse;
  payInvoice: PayInvoiceResponse;
  trackQuoteView: Scalars['Boolean']['output'];
};


export type MutationAcceptQuoteArgs = {
  input: AcceptQuoteInput;
};


export type MutationPayInvoiceArgs = {
  input: PayInvoiceInput;
};


export type MutationTrackQuoteViewArgs = {
  input: TrackQuoteViewInput;
};

export type PayInvoiceInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  invoice: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type PayInvoiceResponse = {
  __typename?: 'PayInvoiceResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  version: Scalars['String']['output'];
};

export type TrackQuoteViewInput = {
  key: Scalars['String']['input'];
  viewType: Scalars['String']['input'];
};

export type TrackQuoteViewMutationVariables = Exact<{
  input: TrackQuoteViewInput;
}>;


export type TrackQuoteViewMutation = { __typename?: 'Mutation', trackQuoteView: boolean };

export type PayInvoiceMutationVariables = Exact<{
  input: PayInvoiceInput;
}>;


export type PayInvoiceMutation = { __typename?: 'Mutation', payInvoice: { __typename?: 'PayInvoiceResponse', success: boolean, message?: string | null } };

export type AcceptQuoteMutationVariables = Exact<{
  input: AcceptQuoteInput;
}>;


export type AcceptQuoteMutation = { __typename?: 'Mutation', acceptQuote: { __typename?: 'AcceptQuoteResponse', success: boolean, message?: string | null } };


export const TrackQuoteViewDocument = gql`
    mutation TrackQuoteView($input: TrackQuoteViewInput!) {
  trackQuoteView(input: $input)
}
    `;
export type TrackQuoteViewMutationFn = Apollo.MutationFunction<TrackQuoteViewMutation, TrackQuoteViewMutationVariables>;

/**
 * __useTrackQuoteViewMutation__
 *
 * To run a mutation, you first call `useTrackQuoteViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackQuoteViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackQuoteViewMutation, { data, loading, error }] = useTrackQuoteViewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackQuoteViewMutation(baseOptions?: Apollo.MutationHookOptions<TrackQuoteViewMutation, TrackQuoteViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackQuoteViewMutation, TrackQuoteViewMutationVariables>(TrackQuoteViewDocument, options);
      }
export type TrackQuoteViewMutationHookResult = ReturnType<typeof useTrackQuoteViewMutation>;
export type TrackQuoteViewMutationResult = Apollo.MutationResult<TrackQuoteViewMutation>;
export type TrackQuoteViewMutationOptions = Apollo.BaseMutationOptions<TrackQuoteViewMutation, TrackQuoteViewMutationVariables>;
export const PayInvoiceDocument = gql`
    mutation PayInvoice($input: PayInvoiceInput!) {
  payInvoice(input: $input) {
    success
    message
  }
}
    `;
export type PayInvoiceMutationFn = Apollo.MutationFunction<PayInvoiceMutation, PayInvoiceMutationVariables>;

/**
 * __usePayInvoiceMutation__
 *
 * To run a mutation, you first call `usePayInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payInvoiceMutation, { data, loading, error }] = usePayInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePayInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<PayInvoiceMutation, PayInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PayInvoiceMutation, PayInvoiceMutationVariables>(PayInvoiceDocument, options);
      }
export type PayInvoiceMutationHookResult = ReturnType<typeof usePayInvoiceMutation>;
export type PayInvoiceMutationResult = Apollo.MutationResult<PayInvoiceMutation>;
export type PayInvoiceMutationOptions = Apollo.BaseMutationOptions<PayInvoiceMutation, PayInvoiceMutationVariables>;
export const AcceptQuoteDocument = gql`
    mutation AcceptQuote($input: AcceptQuoteInput!) {
  acceptQuote(input: $input) {
    success
    message
  }
}
    `;
export type AcceptQuoteMutationFn = Apollo.MutationFunction<AcceptQuoteMutation, AcceptQuoteMutationVariables>;

/**
 * __useAcceptQuoteMutation__
 *
 * To run a mutation, you first call `useAcceptQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptQuoteMutation, { data, loading, error }] = useAcceptQuoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptQuoteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptQuoteMutation, AcceptQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptQuoteMutation, AcceptQuoteMutationVariables>(AcceptQuoteDocument, options);
      }
export type AcceptQuoteMutationHookResult = ReturnType<typeof useAcceptQuoteMutation>;
export type AcceptQuoteMutationResult = Apollo.MutationResult<AcceptQuoteMutation>;
export type AcceptQuoteMutationOptions = Apollo.BaseMutationOptions<AcceptQuoteMutation, AcceptQuoteMutationVariables>;