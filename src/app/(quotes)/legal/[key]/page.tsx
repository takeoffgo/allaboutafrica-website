import { notFound } from "next/navigation";
import LegalDocumentPage from "../doc/page";

export const knownLegalDocs: { [key: string]: string } = {
  "privacy-policy": "b36aca91-20cc-4b81-aa0d-337d4f5cf963",
  "website-terms": "29bc0110-5953-4506-bcbb-2d0e4611f6fb",
  "booking-terms": "35e2fba7-3d36-4a3b-9dd0-73c07a6f76af",
  complaints: "571d5c0f-80e3-4e80-9ea7-e3c3d62e690f",
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
