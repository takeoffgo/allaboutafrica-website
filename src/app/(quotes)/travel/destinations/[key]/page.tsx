// "use client";
import React, { useState } from "react";
import Head from "next/head";
// import { useRouter } from "next/router";
import { Section, Columns, Column, BrandLine } from "@/components/Bulma";
import Image from "@/components/Image";
import Map from "@/components/Quote/components/Map";
// import Footer from "@/components/Footer";
import { jamboClient } from "@/lib/jambo";
import ReactMarkdown from "react-markdown";
import {
  Destination,
  GetDestinationQueryVariables,
  GetDestinationDocument,
  GetDestinationQuery,
} from "@/lib/api/jambo";
// import { extractUrlJson } from "@/lib/util";
// import { GetStaticPaths, GetStaticProps } from "next";
// import { mediaUrl } from "@/components/Quote/global/helpers";

// type DestinationPageProps = {
//   destination: Destination;
// };

export default async function DestinationPage(props: {
  params: Promise<{ key: string }>;
}) {
  // const router = useRouter();

  // const [image, setImage] = useState<string | null>(null);

  // const back = extractUrlJson(router.query.back);

  const destination = await fetchEntity((await props.params).key);

  return (
    <>
      <Head>
        <title>
          {[destination.name, "Destinations", "All About Africa"].join(" - ")}
        </title>
      </Head>
      <>
        <Section container></Section>

        <Section container>
          <Columns>
            <Column>
              <h2 className="title is-2">{destination.name}</h2>
              <BrandLine />
              {destination.body ? (
                <ReactMarkdown className="content">
                  {destination.body}
                </ReactMarkdown>
              ) : null}
            </Column>
            {destination.heroMedia?.hash ? (
              <Column>
                <div className="image is-cover">
                  <Image
                    src={destination.heroMedia.hash}
                    alt={destination.name || "Image of destination"}
                  />
                </div>
              </Column>
            ) : null}
          </Columns>
        </Section>
        <Section container>
          <Columns>
            <Column narrow>
              <h3 className="heading">Country</h3>
              <h4 className="title">{destination.country?.name}</h4>
            </Column>
            <Column />
          </Columns>
        </Section>

        <Section container>
          <Columns multiline>
            {destination.gallery?.mediaGalleryItems.nodes.map((ent: any) => (
              <Column key={ent.id} width={4}>
                <div className="image">
                  <Image
                    src={ent.mediaItem.hash}
                    alt={ent.mediaItem.name}
                    // onClick={() =>
                    //   setImage(
                    //     image === ent.mediaItem.hash ? null : ent.mediaItem.hash
                    //   )
                    // }
                  />
                </div>
              </Column>
            ))}
          </Columns>

          {/* {image ? (
            <div className="image is-cover is-hidden-mobile">
              <Image src={image} alt="" />
            </div>
          ) : null} */}
        </Section>
        {isFinite(destination.latitude ?? NaN) &&
        isFinite(destination.longitude ?? NaN) ? (
          <Map
            points={[
              {
                lat: destination.latitude ?? 0,
                lng: destination.longitude ?? 0,
                id: destination.id,
                type: "destination",
                title: destination.name ?? "",
                icon: "monument",
              },
            ]}
          />
        ) : null}
        {/* <Footer /> */}
      </>
    </>
  );
}

async function fetchEntity(id: string) {
  const res = await jamboClient.query<
    GetDestinationQuery,
    GetDestinationQueryVariables
  >({
    query: GetDestinationDocument,
    fetchPolicy: "network-only",
    variables: { id },
  });

  const destination = res.data.destination as Destination;

  return destination;
}
