import styles from "./Avatar.module.scss";
import getAssets from "../../../lib/directus/getAssets";
import Image from "next/image";
import { ItemInput, UserItem } from "@directus/sdk";

const Avatar = ({ infos, onClick }: { infos: ItemInput<UserItem<unknown>>; onClick?: () => void }) => {
  return (
    infos && (
      <div className={styles.user} onClick={onClick}>
        <div className={styles.avatar}>
          <Image
            src={getAssets(infos.avatar)}
            alt={`Avatar de ${infos.last_name} ${infos.first_name}`}
            fill
            sizes="(max-width: 768px) 20vw,
              (max-width: 1200px) 10vw"
          />
        </div>
      </div>
    )
  );
};

export default Avatar;
