import {
  GetInvoiceDocument,
  GetInvoiceQuery,
  GetInvoiceQueryVariables,
  InvoicePublic,
} from "@/lib/api/jambo";
import Invoice from "@/components/Invoice";
import { jamboClient } from "@/lib/jambo";
import { Metadata } from "next";

type PageProps = {
  searchParams: Promise<{ id: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const entity = await fetchEntity((await searchParams).id);

  return {
    title: `Invoice ${entity.invoice?.number} - All About Africa`,
  };
}

export default async function InvoicePage(props: PageProps) {
  const entity = await fetchEntity((await props.searchParams).id);

  return (
    <>
      <section className="sheet container padding-10mm">
        <Invoice model={entity.invoice as InvoicePublic} />
      </section>
    </>
  );
}

async function fetchEntity(id: string) {
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
