import {
  GetInvoiceDocument,
  GetInvoiceQuery,
  GetInvoiceQueryVariables,
  InvoicePublic,
} from "@/lib/api/jambo";
import Invoice from "@/components/Invoice";
import { jamboClient } from "@/lib/jambo";

export default async function InvoicePage(props: {
  searchParams: Promise<{ id: string }>;
}) {
  const model = await getContent((await props.searchParams).id);

  return (
    <>
      <section className="sheet container padding-10mm">
        <Invoice model={model.invoice as InvoicePublic} />
      </section>
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
