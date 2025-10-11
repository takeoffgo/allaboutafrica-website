import Image from "next/image";

import style from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Image
        className={style.image}
        src="https://cdn.takeoffgo.com/808c2f5788f686b0d3ee4160f8a12dbb"
        alt="All About Africa - Coming soon"
        width={5567}
        height={3711}
      />
      <div className={style.copy}>
        <h1>
          All About Africa
          <br />
          All Heart
          <br />
          All Coming Soon
          <br />
          For the Travel Trade
        </h1>
      </div>
      <div className={style.enquire}>
        <p>Interested about partnering with us?</p>
        <p>
          <a href="mailto:info@allaboutafrica.au?subject=Tell me more about All About Africa">
            Let&apos;s Talk Africa
          </a>
        </p>
      </div>
    </div>
  );
}
