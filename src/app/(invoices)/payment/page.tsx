"use server";
import * as React from "react";
import Payment from "@/components/Payment";
import { Section } from "@/components/Bulma";
import {
  InvoicePublic,
  GetInvoiceQueryVariables,
  GetInvoiceDocument,
  GetInvoiceQuery,
} from "@/lib/api/jambo";
import { jamboClient } from "@/lib/jambo";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type PageProps = {
  searchParams: Promise<{ id?: string; amount?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const model = await getContent((await searchParams).id!);

  return {
    title: ["Payment", `Invoice ${model?.invoice?.number}`, "Take Off Go"].join(
      " - "
    ),
  };
}

export default async function PaymentPage({ searchParams }: PageProps) {
  if (!(await searchParams).id) {
    return notFound();
  }

  const data = await getContent((await searchParams).id || "");
  if (!data) {
    return notFound();
  }

  return (
    <>
      <Section container>
        {/* <Header /> */}
        <div className="columns is-centered">
          <div className="column is-4">
            <Payment
              model={{
                invoice: data?.invoice as InvoicePublic,
                amount: parseFloat((await searchParams).amount as string),
              }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}

async function getContent(id: string) {
  const res = await jamboClient.query<
    GetInvoiceQuery,
    GetInvoiceQueryVariables
  >({
    query: GetInvoiceDocument,
    fetchPolicy: "network-only",
    variables: {
      id,
    },
  });
  return res.data;
}
