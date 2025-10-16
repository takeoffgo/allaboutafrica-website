import {
  GetLegalDocumentDocument,
  GetLegalDocumentQuery,
  GetLegalDocumentQueryVariables,
} from "@/lib/api/jambo";
import { jamboClient } from "@/lib/jambo";
import { BrandLine, Content, Section } from "@/components/Bulma";
import ReactHtmlParser from "html-react-parser";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export default async function LegalDocumentPage(props: {
  searchParams: Promise<{ id: string }>;
}) {
  const document = await fetchEntity((await props.searchParams).id);

  if (!document) {
    return notFound();
  }

  return (
    <>
      <Section container></Section>

      <Section container>
        <h2 className="title is-2">{document.name}</h2>
        <BrandLine />

        <Content>{ReactHtmlParser(document.body ?? "")}</Content>
      </Section>

      <Footer />
    </>
  );
}

async function fetchEntity(id: string) {
  const res = await jamboClient.query<
    GetLegalDocumentQuery,
    GetLegalDocumentQueryVariables
  >({
    query: GetLegalDocumentDocument,
    fetchPolicy: "network-only",
    variables: { id },
  });

  return res.data.entity;
}
