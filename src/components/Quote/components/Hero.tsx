import React from "react";
import Image from "next/image";
import { GetQuoteQuery } from "@/lib/api/jambo";
import Link from "next/link";
import cx from "classnames";
import { TextLogo } from "@/components/Logo";

const Hero = ({ data }: { data: GetQuoteQuery }) => (
  <div className="quote-hero__container">
    {data.quote?.hero?.image?.hash && (
      <div className="quote-hero__image">
        <Image
          src={`https://cdn.takeoffgo.com/${data.quote.hero.image.hash}`}
          width={2000}
          height={1000}
          alt={data.quote.hero.title || ""}
        />
      </div>
    )}

    <div
      className={cx("quote-hero__logo", {
        "--agency": data.quote?.trip?.agency?.logo?.hash,
      })}
    >
      {data.quote?.trip?.agency?.logo?.hash ? (
        <Image
          src={`https://cdn.takeoffgo.com/${data.quote?.trip?.agency?.logo?.hash}`}
          alt=""
          width={500}
          height={500}
        />
      ) : (
        <Link href="/">
          <TextLogo />
        </Link>
      )}
    </div>

    <div className="title">
      <h1>{data.quote?.hero?.title}</h1>
    </div>
  </div>
);

export default Hero;
