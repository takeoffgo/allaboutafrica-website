import Image from "next/image";

import style from "./page.module.css";

export default function Home() {
  return (
    <div>
      <div className={style.copy}>
        <h1>
          All About Africa
          <br />
          All Heart
          <br />
          All Coming Soon
        </h1>
      </div>
      <Image
        className={style.image}
        src="https://cdn.takeoffgo.com/eb8fad5e1a8975f10c8de8f9487b11c4"
        alt="All About Africa - Coming soon"
        width={5567}
        height={3711}
      />
    </div>
  );
}
