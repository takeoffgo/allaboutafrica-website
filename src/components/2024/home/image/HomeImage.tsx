import Image from "next/image";
import styles from "./HomeImage.module.scss";

export function HomeImage() {
  return (
    <div className={styles.container}>
      <Image
        alt=""
        src="https://cdn.pokko.io/2d4b9e75-76ea-4f7b-a643-caeaac7ffb76/b37d7b62-12cd-41c8-83b9-48c142bec06a"
        fill
      />
    </div>
  );
}
