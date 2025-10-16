// "use client";
import React from "react";
import Head from "next/head";
// import { useRouter } from "next/router";
import { Section, Columns, Column, BrandLine } from "@/components/Bulma";
import Image from "@/components/Image";
import Map from "@/components/Quote/components/Map";
// import Footer from "@/components/Footer";
import { jamboClient } from "@/lib/jambo";
import ReactMarkdown from "react-markdown";
import {
  Property,
  GetPropertyDocument,
  GetPropertyQuery,
  GetPropertyQueryVariables,
} from "@/lib/api/jambo";
// import { extractUrlJson } from "@/lib/util";
// import { GetStaticPaths, GetStaticProps } from "next";

export default async function PropertyPage(props: {
  params: Promise<{ key: string }>;
}) {
  // const [image, setImage] = useState<string | null>(null);

  const property = await fetchEntity((await props.params).key);

  return (
    <>
      <Head>
        <title>
          {[property.name, "Properties", "All About Africa"].join(" - ")}
        </title>
      </Head>
      <>
        <Section container></Section>

        <Section container>
          <Columns>
            <Column>
              <h2 className="title is-2">{property.name}</h2>
              <BrandLine />
              {property.summary ? (
                <ReactMarkdown className="content">
                  {property.summary}
                </ReactMarkdown>
              ) : null}
            </Column>
            <Column>
              {property.heroMedia?.hash ? (
                <div className="image is-cover">
                  <Image
                    src={property.heroMedia.hash}
                    alt={property.name || "Image of property"}
                  />
                </div>
              ) : null}
            </Column>
          </Columns>
        </Section>
        <Section container>
          <Columns>
            <Column narrow>
              <h3 className="heading">Country</h3>
              <h4 className="title">{property.country?.name}</h4>
            </Column>
            <Column narrow>
              <h3 className="heading">Nearest airport</h3>
              <h4 className="title">{property.nearestAirport}</h4>
            </Column>
            <Column />
          </Columns>
        </Section>

        <Section container>
          <Columns multiline>
            {property.gallery?.mediaGalleryItems.nodes.map((ent: any) => (
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
          {property.gallery?.childMediaGalleries.nodes.map((ent: any) => (
            <React.Fragment key={ent.id}>
              <p className="heading">{ent.name}</p>
              <Columns multiline>
                {ent.mediaGalleryItems.nodes.map((ent: any) => (
                  <Column key={ent.id} width={4}>
                    <div className="image">
                      <Image
                        src={ent.mediaItem.hash}
                        alt={ent.mediaItem.name}
                        // onClick={() =>
                        //   setImage(
                        //     image === ent.mediaItem.hash
                        //       ? null
                        //       : ent.mediaItem.hash
                        //   )
                        // }
                      />
                    </div>
                  </Column>
                ))}
              </Columns>
            </React.Fragment>
          ))}
          {/* {image ? (
            <div className="image is-cover is-hidden-mobile">
              <Image src={image} alt="" />
            </div>
          ) : null} */}
        </Section>
        {property.latitude && property.longitude ? (
          <Map
            points={[
              {
                lat: property.latitude,
                lng: property.longitude,
                id: property.id,
                icon: "hotel",
                title: property.name || "",
                body: property.summary || "",
                type: "property",
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
    GetPropertyQuery,
    GetPropertyQueryVariables
  >({
    query: GetPropertyDocument,
    fetchPolicy: "network-only",
    variables: { id },
  });

  const property = res.data.property as Property;

  return property;
}
