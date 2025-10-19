// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import gql from "graphql-tag";
import { createYoga, createSchema } from "graphql-yoga";
import {
  AcceptQuoteDocument,
  AcceptQuoteMutation,
  AcceptQuoteMutationVariables,
  PayInvoiceDocument,
  PayInvoiceMutation,
  PayInvoiceMutationVariables,
  TrackQuoteViewDocument,
  TrackQuoteViewMutation,
  TrackQuoteViewMutationVariables,
} from "@/lib/api/jambo";
import { jamboClient } from "@/lib/jambo";
import { headers } from "next/headers";

type AcceptQuoteInput = {
  key: string;
  name: string;
  email: string;
  date: string;
};

type AcceptQuoteResponse = {
  success: boolean;
  message?: string | null;
};

const acceptQuote = async (
  _context: NextContext,
  variables: { input: AcceptQuoteInput }
): Promise<AcceptQuoteResponse> => {
  try {
    const res = await jamboClient.mutate<
      AcceptQuoteMutation,
      AcceptQuoteMutationVariables
    >({
      mutation: AcceptQuoteDocument,
      variables: variables.input,
    });

    if (res.errors) {
      console.error(res.errors);
      return { success: false };
    }

    return res.data?.acceptQuote ?? { success: false };
  } catch (ex) {
    console.error(ex);
    return { success: false };
  }
};

type PayInvoiceInput = {
  token: string;
  invoice: string;
  amount?: number;
};

type PayInvoiceResponse = {
  success: boolean;
  message?: string | null;
};

const payInvoice = async (
  _context: NextContext,
  variables: { input: PayInvoiceInput }
): Promise<PayInvoiceResponse> => {
  try {
    const res = await jamboClient.mutate<
      PayInvoiceMutation,
      PayInvoiceMutationVariables
    >({
      mutation: PayInvoiceDocument,
      variables: variables.input,
    });

    if (res.errors) {
      console.error(res.errors);
      return { success: false };
    }

    return res.data?.executePayment ?? { success: false };
  } catch (ex) {
    console.error(ex);
    return { success: false };
  }
};

type TrackQuoteViewInput = {
  ip: string;
  key: string;
  viewType: string;
};

const trackQuoteView = async (
  _: NextContext,
  variables: { input: TrackQuoteViewInput },
  context: any
): Promise<boolean> => {
  try {
    const inHeaders = await headers();
    const res = await jamboClient.mutate<
      TrackQuoteViewMutation,
      TrackQuoteViewMutationVariables
    >({
      mutation: TrackQuoteViewDocument,
      variables: {
        ...variables.input,
        ip: (inHeaders.get("x-forwarded-for") as string) || "",
      },
    });

    if (res.errors) {
      console.error(res.errors);
      return false;
    }

    return res.data?.trackQuoteView?.success ?? false;
  } catch (ex) {
    console.error(ex);
    return false;
  }
};

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

interface NextContext {
  params: Promise<Record<string, string>>;
}

const schema = createSchema<NextContext>({
  typeDefs: gql`
    input AcceptQuoteInput {
      key: String!
      name: String!
      email: String!
      date: String!
      accepted: Boolean!
    }

    type AcceptQuoteResponse {
      success: Boolean!
      message: String
    }

    input PayInvoiceInput {
      token: String!
      invoice: String!
      amount: Float
    }

    type PayInvoiceResponse {
      success: Boolean!
      message: String
    }

    input TrackQuoteViewInput {
      key: String!
      viewType: String!
    }

    type Query {
      version: String!
    }

    type Mutation {
      acceptQuote(input: AcceptQuoteInput!): AcceptQuoteResponse!
      trackQuoteView(input: TrackQuoteViewInput!): Boolean!
      payInvoice(input: PayInvoiceInput!): PayInvoiceResponse!
    }
  `,
  resolvers: {
    Query: {
      version: () => "2023-02-07",
    },
    Mutation: {
      acceptQuote,
      trackQuoteView,
      payInvoice,
    },
  },
});

const { handleRequest } = createYoga<NextContext>({
  schema,
  graphqlEndpoint: "/api/graphql",
  graphiql: process.env.NODE_ENV === "development",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
