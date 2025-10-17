import { notFound } from "next/navigation";
import LegalDocumentPage from "../doc/page";

const knownLegalDocs: { [key: string]: string } = {
  "privacy-policy": "41d61690-f25e-4fe7-9882-91c3c7f2533c",
  "booking-terms": "a073451f-1eb7-47d2-a3e9-81b39b9ed6cf",
};

export default async function KnownLegalDocumentPage(props: {
  params: Promise<{ key: string }>;
}) {
  const id = knownLegalDocs[(await props.params).key];

  if (!id) {
    return notFound();
  }

  return LegalDocumentPage({
    searchParams: Promise.resolve({
      id,
    }),
  });
}
